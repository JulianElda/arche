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
// since — see internal/changes. Session and Stop payloads drive the
// end-of-turn sweep — see sweep.
func run(r io.Reader, stderr io.Writer, configPathOverride string) int {
	payload, err := hook.Parse(r)
	if err != nil {
		return 0
	}

	// Without a marker directory, everything that needs one no-ops.
	markerDir, markerErr := changes.MarkerDir()
	usesMarkers := payload.ToolName == hook.BashTool ||
		payload.HookEventName == hook.SessionStart ||
		payload.HookEventName == hook.SessionEnd ||
		payload.HookEventName == hook.Stop
	if usesMarkers && markerErr != nil {
		return 0
	}

	switch payload.HookEventName {
	case hook.PreToolUse:
		if payload.ToolName == hook.BashTool {
			changes.Begin(markerDir, payload.ToolUseID)
		}
		return 0
	case hook.SessionStart:
		changes.BeginOnce(markerDir, sessionMarkerID(payload.SessionID))
		return 0
	case hook.SessionEnd:
		changes.End(markerDir, sessionMarkerID(payload.SessionID))
		changes.End(markerDir, sweepMarkerID(payload.SessionID))
		return 0
	case hook.Stop:
		return sweep(markerDir, payload, stderr, configPathOverride)
	}

	var files []string
	if payload.ToolName == hook.BashTool {
		files = bashChangedFiles(markerDir, payload)
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
func bashChangedFiles(markerDir string, payload hook.Payload) []string {
	start, ok := changes.End(markerDir, payload.ToolUseID)
	if !ok || payload.Cwd == "" {
		return nil
	}

	files, err := changes.Since(context.Background(), payload.Cwd, start)
	if err != nil || len(files) > maxBashChangedFiles {
		return nil
	}
	return files
}

// sweep lints every file changed since the session's last clean sweep (or
// since it started), as a safety net for edits the per-tool hooks missed:
// Bash calls over maxBashChangedFiles, edits outside the call's cwd, a
// missing PreToolUse marker. The session marker only moves forward after
// a sweep with no failures, so failing files are checked again at the
// next Stop. With no session marker (SessionStart not wired up, or typos
// added mid-session) it starts one now and does nothing else.
//
// A failure exits 2, which keeps Claude from ending its turn. When Claude
// is already continuing because of a Stop hook, it exits 0 instead so a
// file Claude can't fix doesn't loop the session forever.
func sweep(dir string, payload hook.Payload, stderr io.Writer, configPathOverride string) int {
	session := sessionMarkerID(payload.SessionID)
	start, ok := changes.Peek(dir, session)
	if !ok {
		changes.BeginOnce(dir, session)
		return 0
	}
	if payload.Cwd == "" {
		return 0
	}

	// Stamped before git is asked, so anything changed during the sweep
	// (formatters included) is picked up again next time.
	next := sweepMarkerID(payload.SessionID)
	if err := changes.Begin(dir, next); err != nil {
		return 0
	}

	files, err := changes.Since(context.Background(), payload.Cwd, start)
	if err != nil {
		changes.End(dir, next)
		return 0
	}

	exitCode := 0
	if len(files) > 0 {
		exitCode = lint(files, stderr, configPathOverride)
	}
	if exitCode != 0 {
		changes.End(dir, next)
	} else {
		changes.Rename(dir, next, session)
	}

	if payload.StopHookActive {
		return 0
	}
	return exitCode
}

// sessionMarkerID and sweepMarkerID name a session's marker files. The
// prefixes keep them apart from each other and from tool_use_id markers.
func sessionMarkerID(sessionID string) string { return "session-" + sessionID }
func sweepMarkerID(sessionID string) string   { return "sweep-" + sessionID }

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
