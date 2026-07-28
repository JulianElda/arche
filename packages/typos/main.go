// Command typos lints/formats the single file Claude Code just wrote or
// edited, without ever touching git — see CLAUDE.md for the full design.
package main

import (
	"context"
	"errors"
	"flag"
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
	var configPath string
	flag.StringVar(&configPath, "c", "", "path to .nano-staged.json (skips auto-discovery)")
	flag.StringVar(&configPath, "config", "", "path to .nano-staged.json (skips auto-discovery)")
	flag.Parse()

	os.Exit(run(os.Stdin, os.Stderr, configPath))
}

// run reads a PostToolUse payload from r, lints/formats the edited file
// against its repo's .nano-staged.json if applicable, and returns the
// process exit code. A failing command's output is written to stderr.
// configPathOverride, if non-empty, is used verbatim instead of
// auto-discovering the nearest .nano-staged.json.
func run(r io.Reader, stderr io.Writer, configPathOverride string) int {
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

	config, configPath, err := resolveConfig(configPathOverride, path)
	if err != nil {
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

// resolveConfig loads override if given, otherwise auto-discovers the
// nearest .nano-staged.json to filePath's directory. err is non-nil for
// "no usable config" in either case — no config found, or a given/found
// config that failed to parse.
func resolveConfig(override, filePath string) (nanostaged.Config, string, error) {
	if override != "" {
		config, err := nanostaged.Load(override)
		if err != nil {
			return nil, "", err
		}
		return config, override, nil
	}

	config, configPath, ok, err := nanostaged.Discover(filepath.Dir(filePath))
	if err != nil {
		return nil, "", err
	}
	if !ok {
		return nil, "", errors.New("no .nano-staged.json found")
	}
	return config, configPath, nil
}

// writeFailure reports a command failure the way Claude should see it:
// which command ran, and whatever it printed (or, if it never got that
// far, why). Output is combined stdout+stderr — some linters (oxlint
// included) report diagnostics on stdout, not stderr.
func writeFailure(w io.Writer, f *runner.CommandFailure) {
	fmt.Fprintf(w, "typos: %q failed (pattern %s)\n", f.Command, f.Pattern)
	if f.Err != nil {
		fmt.Fprintln(w, f.Err)
	}
	if f.Output != "" {
		io.WriteString(w, f.Output)
	}
}
