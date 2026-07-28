// Command typos lints/formats the single file Claude Code just wrote or
// edited, without ever touching git — see CLAUDE.md for the full design.
package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	"github.com/JulianElda/arche/packages/typos/internal/hook"
	"github.com/JulianElda/arche/packages/typos/internal/nanostaged"
	"github.com/JulianElda/arche/packages/typos/internal/runner"
)

// commandTimeout bounds how long any single lint/format command may run.
const commandTimeout = 30 * time.Second

// blockingFeedbackExitCode is Claude Code's PostToolUse convention: only
// this exact exit code gets a hook's stderr fed back to Claude as
// blocking feedback.
const blockingFeedbackExitCode = 2

func main() {
	os.Exit(run(os.Stdin, os.Stderr))
}

// run reads a PostToolUse payload from r, lints/formats the edited file
// against its repo's .nano-staged.json if applicable, and returns the
// process exit code. A failing command's output is written to stderr.
func run(r io.Reader, stderr io.Writer) int {
	payload, err := hook.Parse(r)
	if err != nil {
		return 0
	}

	path, ok := payload.FilePath()
	if !ok {
		return 0
	}

	info, err := os.Stat(path)
	if err != nil || !info.Mode().IsRegular() {
		return 0
	}

	config, configPath, ok, err := nanostaged.Discover(filepath.Dir(path))
	if !ok || err != nil {
		return 0
	}

	repoRoot := filepath.Dir(configPath)
	groups, err := config.Match(repoRoot, path)
	if err != nil || len(groups) == 0 {
		return 0
	}

	failure := runner.Run(context.Background(), groups, path, repoRoot, commandTimeout)
	if failure == nil {
		return 0
	}

	writeFailure(stderr, failure)
	return blockingFeedbackExitCode
}

// writeFailure reports a command failure the way Claude should see it:
// which command ran, and whatever it printed to its own stderr (or, if it
// never got that far, why).
func writeFailure(w io.Writer, f *runner.CommandFailure) {
	fmt.Fprintf(w, "typos: %q failed (pattern %s)\n", f.Command, f.Pattern)
	if f.Err != nil {
		fmt.Fprintln(w, f.Err)
	}
	if f.Stderr != "" {
		io.WriteString(w, f.Stderr)
	}
}
