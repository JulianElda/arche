package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestRun_BashIsNoOp(t *testing.T) {
	payload := `{"tool_name":"Bash","tool_input":{"command":"ls"}}`
	if got := run(strings.NewReader(payload)); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_MissingFilePathIsNoOp(t *testing.T) {
	payload := `{"tool_name":"Write","tool_input":{}}`
	if got := run(strings.NewReader(payload)); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_MalformedPayloadIsNoOp(t *testing.T) {
	if got := run(strings.NewReader(`{not json`)); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_NonexistentFileIsNoOp(t *testing.T) {
	payload := `{"tool_name":"Write","tool_input":{"file_path":"/does/not/exist.ts"}}`
	if got := run(strings.NewReader(payload)); got != 0 {
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
	if got := run(strings.NewReader(payload)); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}

func TestRun_ConfigFoundReachesTheTODO(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, ".nano-staged.json"), []byte(`{"**/*.ts": "oxfmt"}`), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}
	filePath := filepath.Join(dir, "a.ts")
	if err := os.WriteFile(filePath, []byte("export {}"), 0o644); err != nil {
		t.Fatalf("WriteFile() error = %v", err)
	}

	payload := `{"tool_name":"Write","tool_input":{"file_path":"` + filePath + `"}}`
	if got := run(strings.NewReader(payload)); got != 0 {
		t.Errorf("run() = %d, want 0", got)
	}
}
