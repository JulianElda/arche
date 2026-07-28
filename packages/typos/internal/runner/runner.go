// Package runner tokenizes and executes .nano-staged.json command chains
// against a single file, replicating nano-staged's own execution
// semantics — see CLAUDE.md for the full design.
package runner

import (
	"bytes"
	"context"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/mattn/go-shellwords"

	"github.com/JulianElda/arche/packages/typos/internal/nanostaged"
)

// Tokenize shell-word tokenizes a command string, e.g. `"oxlint --fix"` ->
// `["oxlint", "--fix"]`, matching how nano-staged splits config command
// strings before spawning them.
func Tokenize(command string) ([]string, error) {
	return shellwords.Parse(command)
}

// FindNodeModulesBin walks up from dir looking for the nearest
// node_modules/.bin directory, stopping at the filesystem root.
func FindNodeModulesBin(dir string) (path string, ok bool) {
	dir = filepath.Clean(dir)
	for {
		candidate := filepath.Join(dir, "node_modules", ".bin")
		if info, err := os.Stat(candidate); err == nil && info.IsDir() {
			return candidate, true
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			return "", false
		}
		dir = parent
	}
}

// PrependPath returns a copy of env (in os.Environ's "KEY=value" form)
// with binDir prepended to its PATH entry, matching nano-staged's own
// PATH resolution so today's bare `oxlint`/`oxfmt` commands keep
// resolving. If binDir is empty, env is returned unchanged. The PATH key
// is matched case-insensitively so this also covers Windows' "Path".
func PrependPath(env []string, binDir string) []string {
	if binDir == "" {
		return env
	}

	updated := make([]string, len(env))
	copy(updated, env)

	for i, kv := range updated {
		key, value, found := strings.Cut(kv, "=")
		if found && strings.EqualFold(key, "PATH") {
			updated[i] = key + "=" + binDir + string(os.PathListSeparator) + value
			return updated
		}
	}

	return append(updated, "PATH="+binDir)
}

// CommandFailure describes the first command that failed while running a
// matched group's chain.
type CommandFailure struct {
	Pattern  string // the glob pattern this command's group matched
	Command  string // the original (untokenized) command string
	ExitCode int    // the command's real exit code; -1 if it never ran/completed normally
	Stderr   string
	Err      error // non-nil only when ExitCode is -1 (tokenize error, command not found, timeout, ...)
}

// Run executes each matched group's commands against filePath, appended
// as each command's trailing argument. Groups run concurrently; commands
// within a single group run sequentially and stop at that group's first
// failure. repoRoot is used both as the working directory for every
// spawned command and as the starting point for locating the nearest
// node_modules/.bin to prepend to PATH. Each command gets its own timeout.
//
// Run returns the first CommandFailure found, in matched-group order
// (which is deterministic — sorted by pattern — even though the groups
// themselves run concurrently), or nil if every group's chain succeeded.
func Run(ctx context.Context, groups []nanostaged.MatchedGroup, filePath, repoRoot string, timeout time.Duration) *CommandFailure {
	binDir, _ := FindNodeModulesBin(repoRoot)
	env := PrependPath(os.Environ(), binDir)

	failures := make([]*CommandFailure, len(groups))
	var wg sync.WaitGroup
	for i, group := range groups {
		wg.Add(1)
		go func(i int, group nanostaged.MatchedGroup) {
			defer wg.Done()
			failures[i] = runGroup(ctx, group, filePath, repoRoot, env, timeout)
		}(i, group)
	}
	wg.Wait()

	for _, failure := range failures {
		if failure != nil {
			return failure
		}
	}
	return nil
}

// runGroup runs one matched group's commands sequentially, stopping at
// the first failure.
func runGroup(ctx context.Context, group nanostaged.MatchedGroup, filePath, repoRoot string, env []string, timeout time.Duration) *CommandFailure {
	for _, command := range group.Commands {
		if failure := runCommand(ctx, group.Pattern, command, filePath, repoRoot, env, timeout); failure != nil {
			return failure
		}
	}
	return nil
}

func runCommand(ctx context.Context, pattern, command, filePath, repoRoot string, env []string, timeout time.Duration) *CommandFailure {
	args, err := Tokenize(command)
	if err != nil {
		return &CommandFailure{Pattern: pattern, Command: command, ExitCode: -1, Err: err}
	}
	if len(args) == 0 {
		return nil
	}

	// exec.Command resolves a bare (no path separator) argv[0] via the
	// *current process's* PATH, not cmd.Env — so bare command names must
	// be resolved against our PATH-prepended env ourselves.
	resolved, err := lookPath(args[0], env)
	if err != nil {
		return &CommandFailure{Pattern: pattern, Command: command, ExitCode: -1, Err: err}
	}
	args = append(args, filePath)

	cmdCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	cmd := exec.CommandContext(cmdCtx, resolved, args[1:]...)
	cmd.Dir = repoRoot
	cmd.Env = env
	// If the context deadline kills this process while it has children
	// still holding its stdout/stderr pipes open (e.g. a backgrounded
	// grandchild), Wait would otherwise block until they exit on their
	// own; WaitDelay bounds that by forcibly closing the pipes instead.
	cmd.WaitDelay = timeout
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) && exitErr.Exited() {
			return &CommandFailure{Pattern: pattern, Command: command, ExitCode: exitErr.ExitCode(), Stderr: stderr.String()}
		}
		return &CommandFailure{Pattern: pattern, Command: command, ExitCode: -1, Stderr: stderr.String(), Err: err}
	}
	return nil
}

// lookPath resolves name to an executable path using env's PATH entry
// instead of the current process's, mirroring exec.LookPath. Names that
// already contain a path separator are returned unchanged, matching
// exec.LookPath's own behavior on such inputs.
func lookPath(name string, env []string) (string, error) {
	if strings.ContainsRune(name, os.PathSeparator) {
		return name, nil
	}

	var path string
	for _, kv := range env {
		key, value, found := strings.Cut(kv, "=")
		if found && strings.EqualFold(key, "PATH") {
			path = value
			break
		}
	}

	for _, dir := range filepath.SplitList(path) {
		if dir == "" {
			dir = "."
		}
		candidate := filepath.Join(dir, name)
		if info, err := os.Stat(candidate); err == nil && !info.IsDir() && info.Mode()&0o111 != 0 {
			return candidate, nil
		}
	}
	return "", &exec.Error{Name: name, Err: exec.ErrNotFound}
}
