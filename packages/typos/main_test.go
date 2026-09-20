package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/JulianElda/arche/packages/typos/internal/changes"
)

func TestRun_BashWithoutPreToolUseIsNoOp(t *testing.T) {
	isolateMarkers(t)
	payload := `{"hook_event_name":"PostToolUse","tool_name":"Bash","tool_use_id":"toolu_1","cwd":"/","tool_input":{"command":"ls"}}`
	if got := run(strings.NewReader(payload), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_MissingFilePathIsNoOp(t *testing.T) {
	payload := `{"tool_name":"Write","tool_input":{}}`
	if got := run(strings.NewReader(payload), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_MalformedPayloadIsNoOp(t *testing.T) {
	if got := run(strings.NewReader(`{not json`), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_NonexistentFileIsNoOp(t *testing.T) {
	payload := `{"tool_name":"Write","tool_input":{"file_path":"/does/not/exist.ts"}}`
	if got := run(strings.NewReader(payload), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_NoConfigFoundIsNoOp(t *testing.T) {
	dir := t.TempDir()
	filePath := filepath.Join(dir, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	if got := run(strings.NewReader(payload), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_NoPatternMatchIsNoOp(t *testing.T) {
	dir := t.TempDir()
	writeConfigFile(t, dir, `{"**/*.ts": "oxfmt"}`)
	filePath := filepath.Join(dir, "README.txt")
	if err := os.WriteFile(filePath, []byte("hello"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	if got := run(strings.NewReader(payload), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_EndToEnd_SuccessfulCommandIsNotBlocking(t *testing.T) {
	repoRoot := t.TempDir()
	ok := writeScript(t, repoRoot, "ok.sh", "exit 0\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+ok+`"}`)
	filePath := filepath.Join(repoRoot, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	var stderr bytes.Buffer
	if got := run(strings.NewReader(payload), &stderr, ""); got != 0 {
		t.Errorf("run() = %d, want 0; stderr = %s", got, stderr.String())
	}
}

func TestRun_EndToEnd_FailingCommandIsBlockingFeedback(t *testing.T) {
	repoRoot := t.TempDir()
	fail := writeScript(t, repoRoot, "fail.sh", "echo custom lint error >&2\nexit 1\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+fail+`"}`)
	filePath := filepath.Join(repoRoot, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	var stderr bytes.Buffer
	if got := run(strings.NewReader(payload), &stderr, ""); got != 2 {
		t.Errorf("run() = %d, want 2 (blocking feedback)", got)
	}
	if !strings.Contains(stderr.String(), "custom lint error") {
		t.Errorf("stderr = %q, want it to contain %q", stderr.String(), "custom lint error")
	}
}

func TestRun_EndToEnd_BareCommandResolvesViaNodeModulesBin(t *testing.T) {
	repoRoot := t.TempDir()
	binDir := filepath.Join(repoRoot, "node_modules", ".bin")
	if err := os.MkdirAll(binDir, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}
	writeScript(t, binDir, "fakelint", "exit 0\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "fakelint --fix"}`)
	filePath := filepath.Join(repoRoot, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	var stderr bytes.Buffer
	if got := run(strings.NewReader(payload), &stderr, ""); got != 0 {
		t.Errorf("run() = %d, want 0; stderr = %s", got, stderr.String())
	}
}

func TestRun_ConfigOverride_SkipsAutoDiscovery(t *testing.T) {
	// The edited file lives under repoRoot, which has no .nano-staged.json
	// of its own — only the override path (elsewhere entirely) does.
	repoRoot := t.TempDir()
	filePath := filepath.Join(repoRoot, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	configDir := t.TempDir()
	ok := writeScript(t, configDir, "ok.sh", "exit 0\n")
	configPath := filepath.Join(configDir, ".nano-staged.json")
	writeConfigFile(t, configDir, `{"**/*.ts": "`+ok+`"}`)

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	var stderr bytes.Buffer
	if got := run(strings.NewReader(payload), &stderr, configPath); got != 0 {
		t.Errorf("run() = %d, want 0; stderr = %s", got, stderr.String())
	}
}

func TestRun_ConfigOverride_MissingFileIsNoOp(t *testing.T) {
	dir := t.TempDir()
	writeConfigFile(t, dir, `{"**/*.ts": "oxfmt"}`)
	filePath := filepath.Join(dir, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	// A real, auto-discoverable config sits right next to the file, but
	// the (nonexistent) override should still take precedence and fail
	// closed rather than falling back to auto-discovery.
	if got := run(strings.NewReader(payload), &bytes.Buffer{}, filepath.Join(dir, "does-not-exist.json")); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_Bash_LintsFilesChangedDuringTheCall(t *testing.T) {
	isolateMarkers(t)
	repoRoot := newGitRepo(t)
	fail := writeScript(t, t.TempDir(), "fail.sh", `echo "lint error in $*" >&2`+"\nexit 1\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+fail+`"}`)
	before := filepath.Join(repoRoot, "before.ts")
	if err := os.WriteFile(before, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	if got := run(strings.NewReader(bashPayload("PreToolUse", "toolu_1", repoRoot)), &bytes.Buffer{}, ""); got != 0 {
		t.Fatalf("PreToolUse run() = %d, want 0", got)
	}

	// What a `sed -i`/`cat >` in the Bash call would have done.
	edited := filepath.Join(repoRoot, "src", "edited.ts")
	if err := os.MkdirAll(filepath.Dir(edited), 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}
	if err := os.WriteFile(edited, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}
	backdate(t, before)

	var stderr bytes.Buffer
	if got := run(strings.NewReader(bashPayload("PostToolUse", "toolu_1", filepath.Join(repoRoot, "src"))), &stderr, ""); got != 2 {
		t.Fatalf("PostToolUse run() = %d, want 2; stderr = %s", got, stderr.String())
	}
	if want := "lint error in " + edited + "\n"; !strings.Contains(stderr.String(), want) {
		t.Errorf("stderr = %q, want it to contain %q (only the file changed during the call)", stderr.String(), want)
	}
}

func TestRun_Bash_TooManyChangedFilesIsSkipped(t *testing.T) {
	isolateMarkers(t)
	repoRoot := newGitRepo(t)
	fail := writeScript(t, t.TempDir(), "fail.sh", "exit 1\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+fail+`"}`)

	run(strings.NewReader(bashPayload("PreToolUse", "toolu_1", repoRoot)), &bytes.Buffer{}, "")
	for i := range maxBashChangedFiles + 1 {
		path := filepath.Join(repoRoot, fmt.Sprintf("f%d.ts", i))
		if err := os.WriteFile(path, []byte("export {}"), 0o644); err != nil {
			t.Fatalf("WriteFile() error = %v", err)
		}
	}

	if got := run(strings.NewReader(bashPayload("PostToolUse", "toolu_1", repoRoot)), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_Stop_LintsFilesChangedDuringTheSession(t *testing.T) {
	isolateMarkers(t)
	repoRoot := newGitRepo(t)
	fail := writeScript(t, t.TempDir(), "fail.sh", `echo "lint error in $*" >&2`+"\nexit 1\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+fail+`"}`)
	before := writeTS(t, repoRoot, "before.ts")
	backdate(t, before)

	run(strings.NewReader(sessionPayload("SessionStart", repoRoot, false)), &bytes.Buffer{}, "")
	edited := writeTS(t, repoRoot, "src/edited.ts")

	var stderr bytes.Buffer
	if got := run(strings.NewReader(sessionPayload("Stop", repoRoot, false)), &stderr, ""); got != 2 {
		t.Fatalf("Stop run() = %d, want 2; stderr = %s", got, stderr.String())
	}
	if want := "lint error in " + edited + "\n"; !strings.Contains(stderr.String(), want) {
		t.Errorf("stderr = %q, want it to contain %q (only the file changed during the session)", stderr.String(), want)
	}

	// Still failing, but Claude is already continuing because of a Stop
	// hook: report without blocking again.
	if got := run(strings.NewReader(sessionPayload("Stop", repoRoot, true)), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("Stop run() with stop_hook_active = %d, want 0", got)
	}

	// The failed sweeps didn't move the session marker forward, so the
	// same file is still checked at the next Stop.
	if got := run(strings.NewReader(sessionPayload("Stop", repoRoot, false)), &bytes.Buffer{}, ""); got != 2 {
		t.Errorf("next Stop run() = %d, want 2", got)
	}
}

func TestRun_Stop_CleanSweepIsNotRepeated(t *testing.T) {
	isolateMarkers(t)
	repoRoot := newGitRepo(t)
	marker := filepath.Join(t.TempDir(), "runs")
	count := writeScript(t, t.TempDir(), "count.sh", "echo run >> "+marker+"\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+count+`"}`)

	run(strings.NewReader(sessionPayload("SessionStart", repoRoot, false)), &bytes.Buffer{}, "")
	markerDir, err := changes.MarkerDir()
	if err != nil {
		t.Fatalf("MarkerDir() error = %v", err)
	}
	backdate(t, filepath.Join(markerDir, "session-"+testSessionID))
	// A minute ago: after the (backdated) session start, but clearly before
	// the first sweep, which a same-tick mtime wouldn't be.
	a := writeTS(t, repoRoot, "a.ts")
	minuteAgo := time.Now().Add(-time.Minute)
	if err := os.Chtimes(a, minuteAgo, minuteAgo); err != nil {
		t.Fatalf("Chtimes() error = %v", err)
	}

	for range 2 {
		if got := run(strings.NewReader(sessionPayload("Stop", repoRoot, false)), &bytes.Buffer{}, ""); got != 0 {
			t.Fatalf("Stop run() = %d, want 0", got)
		}
	}
	got, err := os.ReadFile(marker)
	if err != nil {
		t.Fatalf("ReadFile() error = %v", err)
	}
	if string(got) != "run\n" {
		t.Errorf("lint ran %q, want exactly once (the second sweep had nothing new)", got)
	}
}

func TestRun_Stop_WithoutSessionStartIsNoOp(t *testing.T) {
	isolateMarkers(t)
	repoRoot := newGitRepo(t)
	fail := writeScript(t, t.TempDir(), "fail.sh", "exit 1\n")
	writeConfigFile(t, repoRoot, `{"**/*.ts": "`+fail+`"}`)
	writeTS(t, repoRoot, "a.ts")

	if got := run(strings.NewReader(sessionPayload("Stop", repoRoot, false)), &bytes.Buffer{}, ""); got != 0 {
		t.Errorf("Stop run() = %d, want 0", got)
	}
}

func TestDoctor(t *testing.T) {
	t.Run("names where each dependency resolved", func(t *testing.T) {
		isolateMarkers(t)
		repoRoot := newGitRepo(t)
		writeConfigFile(t, repoRoot, `{"**/*.ts": "oxfmt"}`)

		var out bytes.Buffer
		if got := doctor(&out, repoRoot); got != 0 {
			t.Fatalf("doctor() = %d, want 0; output = %s", got, out.String())
		}

		git, source, err := changes.FindGit(repoRoot)
		if err != nil {
			t.Fatalf("FindGit() error = %v", err)
		}
		markerDir, err := changes.MarkerDir()
		if err != nil {
			t.Fatalf("MarkerDir() error = %v", err)
		}
		for _, want := range []string{
			"git:      " + git + " (" + source + ")\n",
			"markers:  " + markerDir + "\n",
			"worktree: " + repoRoot + "\n",
			"config:   " + filepath.Join(repoRoot, ".nano-staged.json") + "\n",
		} {
			if !strings.Contains(out.String(), want) {
				t.Errorf("doctor() output = %q, want it to contain %q", out.String(), want)
			}
		}
	})

	t.Run("defaults to the process's working directory", func(t *testing.T) {
		isolateMarkers(t)
		repoRoot := newGitRepo(t)
		writeConfigFile(t, repoRoot, `{"**/*.ts": "oxfmt"}`)
		t.Chdir(repoRoot)

		var out bytes.Buffer
		if got := doctorFromCwd(&out); got != 0 {
			t.Fatalf("doctorFromCwd() = %d, want 0; output = %s", got, out.String())
		}
		if want := "config:   " + filepath.Join(repoRoot, ".nano-staged.json") + "\n"; !strings.Contains(out.String(), want) {
			t.Errorf("doctorFromCwd() output = %q, want it to contain %q", out.String(), want)
		}
	})

	t.Run("reports an unavailable cache directory", func(t *testing.T) {
		// os.UserCacheDir needs one of these; with neither, the markers
		// line reports instead of naming a path.
		t.Setenv("XDG_CACHE_HOME", "")
		t.Setenv("HOME", "")
		t.Setenv("LocalAppData", "")

		var out bytes.Buffer
		doctor(&out, t.TempDir())
		if want := "markers:  no user cache directory: "; !strings.Contains(out.String(), want) {
			t.Errorf("doctor() output = %q, want it to contain %q", out.String(), want)
		}
	})

	t.Run("exits 1 when git can't be found", func(t *testing.T) {
		isolateMarkers(t)
		// The fixed candidates exist wherever these tests run, so the real
		// lookup can't be made to fail — see lookupGit.
		original := lookupGit
		t.Cleanup(func() { lookupGit = original })
		lookupGit = func(string) (string, string, error) { return "", "", changes.ErrGitNotFound }

		var out bytes.Buffer
		if got := doctor(&out, t.TempDir()); got != 1 {
			t.Errorf("doctor() = %d, want 1; output = %s", got, out.String())
		}
		for _, want := range []string{
			"git:      not found in any fixed system location or trusted PATH entry\n",
			"worktree: not in a git work tree\n",
			"config:   none found\n",
		} {
			if !strings.Contains(out.String(), want) {
				t.Errorf("doctor() output = %q, want it to contain %q", out.String(), want)
			}
		}
	})
}

// sessionPayload returns a session-level hook payload for the given event.
func sessionPayload(event, cwd string, stopHookActive bool) string {
	return fmt.Sprintf(`{"hook_event_name":%q,"session_id":%q,"cwd":%q,"stop_hook_active":%t}`, event, testSessionID, cwd, stopHookActive)
}

// testSessionID is the session_id sessionPayload sends.
const testSessionID = "0b8e2c1a-5f3d-4c2e-9a7b-1d2e3f4a5b6c"

// writeTS writes an empty TypeScript module to root/rel and returns its path.
func writeTS(t *testing.T, root, rel string) string {
	t.Helper()
	path := filepath.Join(root, filepath.FromSlash(rel))
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}
	if err := os.WriteFile(path, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}
	return path
}

// isolateMarkers points changes.MarkerDir at a fresh temp dir for this
// test, so markers neither leak into nor read from the real user cache.
func isolateMarkers(t *testing.T) {
	t.Helper()
	dir := t.TempDir()
	t.Setenv("XDG_CACHE_HOME", dir) // Linux
	t.Setenv("HOME", dir)           // macOS
	t.Setenv("LocalAppData", dir)   // Windows
}

// newGitRepo returns a fresh temp dir initialized as a git work tree.
func newGitRepo(t *testing.T) string {
	t.Helper()
	dir := t.TempDir()
	if out, err := exec.Command("git", "init", "-q", dir).CombinedOutput(); err != nil {
		t.Fatalf("git init error = %v\n%s", err, out)
	}
	return dir
}

// bashPayload returns a Bash tool hook payload for the given event.
func bashPayload(event, toolUseID, cwd string) string {
	return `{"hook_event_name":"` + event + `","tool_name":"Bash","tool_use_id":"` + toolUseID + `","cwd":"` + cwd + `","tool_input":{"command":"true"}}`
}

// backdate sets path's mtime an hour into the past, as if it had been
// changed before the Bash call under test started.
func backdate(t *testing.T, path string) {
	t.Helper()
	past := time.Now().Add(-time.Hour)
	if err := os.Chtimes(path, past, past); err != nil {
		t.Fatalf("Chtimes() error = %v", err)
	}
}

// writeScript writes an executable shell script to dir/name and returns
// its absolute path.
func writeScript(t *testing.T, dir, name, contents string) string {
	t.Helper()
	path := filepath.Join(dir, name)
	if err := os.WriteFile(path, []byte("#!/bin/sh\n"+contents), 0o755); err != nil {
		t.Fatalf("WriteFile(%q) error = %v", path, err)
	}
	return path
}

// writeConfigFile writes contents to dir/.nano-staged.json.
func writeConfigFile(t *testing.T, dir, contents string) {
	t.Helper()
	if err := os.WriteFile(filepath.Join(dir, ".nano-staged.json"), []byte(contents), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}
}
