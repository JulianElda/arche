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
)

func TestRun_BashWithoutPreToolUseIsNoOp(t *testing.T) {
	t.Setenv("TMPDIR", t.TempDir())
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
	t.Setenv("TMPDIR", t.TempDir())
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
	t.Setenv("TMPDIR", t.TempDir())
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
	info, err := os.Stat(path)
	if err != nil {
		t.Fatalf("Stat() error = %v", err)
	}
	past := info.ModTime().Add(-time.Hour)
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
