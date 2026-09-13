// Command typos lints/formats the file(s) Claude Code just wrote or edited,
// without ever writing to git — see CLAUDE.md for the full design.
package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	"github.com/JulianElda/arche/packages/typos/internal/changes"
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

// maxBashChangedFiles caps how many files a single Bash call can queue for
// linting. A call that touched more (a codemod, `git checkout .`) is
// skipped: per-edit feedback is for small edits, and linting hundreds of
// files would stall Claude after that one call.
const maxBashChangedFiles = 20

// run reads a tool hook payload from r, lints/formats the file(s) it
// changed against their repo's .nano-staged.json if applicable, and
// returns the process exit code. A failing command's output is written to
// stderr. configPathOverride, if non-empty, is used verbatim instead of
// auto-discovering the nearest .nano-staged.json.
//
// Write/Edit/MultiEdit payloads name their file directly. Bash payloads
// don't, so a PreToolUse Bash payload records the call's start time and
// the matching PostToolUse payload lints whatever git reports as changed
// since — see internal/changes.
func run(r io.Reader, stderr io.Writer, configPathOverride string) int {
	payload, err := hook.Parse(r)
	if err != nil {
		return 0
	}

	if payload.HookEventName == hook.PreToolUse {
		if payload.ToolName == hook.BashTool {
			changes.Begin(changes.MarkerDir(), payload.ToolUseID)
		}
		return 0
	}

	var files []string
	if payload.ToolName == hook.BashTool {
		files = bashChangedFiles(payload)
	} else if path, ok := payload.FilePath(); ok {
		if info, err := os.Stat(path); err == nil && info.Mode().IsRegular() {
			files = []string{path}
		}
	}
	if len(files) == 0 {
		return 0
	}

	return lint(files, stderr, configPathOverride)
}

// bashChangedFiles returns the files changed since the PreToolUse hook
// recorded this Bash call, or nil if it didn't, git can't tell, or the
// call changed more than maxBashChangedFiles.
func bashChangedFiles(payload hook.Payload) []string {
	start, ok := changes.End(changes.MarkerDir(), payload.ToolUseID)
	if !ok || payload.Cwd == "" {
		return nil
	}

	files, err := changes.Since(context.Background(), payload.Cwd, start)
	if err != nil || len(files) > maxBashChangedFiles {
		return nil
	}
	return files
}

// lint groups files by the .nano-staged.json that applies to each (the
// override, or the nearest one found walking up from the file) and runs
// every matched command chain, with each group's matching files appended
// to its commands in one spawn. Files with no config, no parseable config
// or no matching pattern are skipped.
func lint(files []string, stderr io.Writer, configPathOverride string) int {
	var configPaths []string
	filesByConfig := make(map[string][]string)
	for _, file := range files {
		configPath := configPathOverride
		if configPath == "" {
			found, ok := nanostaged.Find(filepath.Dir(file))
			if !ok {
				continue
			}
			configPath = found
		}
		if _, seen := filesByConfig[configPath]; !seen {
			configPaths = append(configPaths, configPath)
		}
		filesByConfig[configPath] = append(filesByConfig[configPath], file)
	}

	exitCode := 0
	for _, configPath := range configPaths {
		config, err := nanostaged.Load(configPath)
		if err != nil {
			continue
		}

		repoRoot := filepath.Dir(configPath)
		groups, err := config.Match(repoRoot, filesByConfig[configPath]...)
		if err != nil || len(groups) == 0 {
			continue
		}

		if failure := runner.Run(context.Background(), groups, repoRoot, commandTimeout); failure != nil {
			writeFailure(stderr, failure)
			exitCode = blockingFeedbackExitCode
		}
	}
	return exitCode
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
