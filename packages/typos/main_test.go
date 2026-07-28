package main

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestRun_BashIsNoOp(t *testing.T) {
	payload := `{"tool_name":"Bash","tool_input":{"command":"ls"}}`
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
