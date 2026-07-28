package hook

import (
	"strings"
	"testing"
)

func TestParse(t *testing.T) {
	payload, err := Parse(strings.NewReader(`{"tool_name":"Write","tool_input":{"file_path":"/tmp/foo.ts"}}`))
	if err != nil {
		t.Fatalf("Parse() error = %v", err)
	}
	if payload.ToolName != "Write" {
		t.Errorf("ToolName = %q, want %q", payload.ToolName, "Write")
	}
	if payload.ToolInput.FilePath != "/tmp/foo.ts" {
		t.Errorf("ToolInput.FilePath = %q, want %q", payload.ToolInput.FilePath, "/tmp/foo.ts")
	}
}

func TestParse_IgnoresUnknownFields(t *testing.T) {
	payload, err := Parse(strings.NewReader(`{
		"session_id": "abc123",
		"cwd": "/repo",
		"hook_event_name": "PostToolUse",
		"tool_name": "Edit",
		"tool_input": {"file_path": "/repo/a.go", "content": "package main"},
		"tool_response": {"ok": true}
	}`))
	if err != nil {
		t.Fatalf("Parse() error = %v", err)
	}
	if payload.ToolName != "Edit" {
		t.Errorf("ToolName = %q, want %q", payload.ToolName, "Edit")
	}
}

func TestParse_MalformedJSON(t *testing.T) {
	if _, err := Parse(strings.NewReader(`{not json`)); err == nil {
		t.Fatal("Parse() error = nil, want an error for malformed JSON")
	}
}

func TestPayload_FilePath(t *testing.T) {
	tests := []struct {
		name     string
		toolName string
		filePath string
		wantPath string
		wantIsOK bool
	}{
		{name: "Write is supported", toolName: "Write", filePath: "/a.ts", wantPath: "/a.ts", wantIsOK: true},
		{name: "Edit is supported", toolName: "Edit", filePath: "/a.ts", wantPath: "/a.ts", wantIsOK: true},
		{name: "MultiEdit is supported", toolName: "MultiEdit", filePath: "/a.ts", wantPath: "/a.ts", wantIsOK: true},
		{name: "Bash is not supported", toolName: "Bash", filePath: "/a.ts", wantPath: "", wantIsOK: false},
		{name: "unknown tool is not supported", toolName: "Read", filePath: "/a.ts", wantPath: "", wantIsOK: false},
		{name: "empty file path is not actionable", toolName: "Write", filePath: "", wantPath: "", wantIsOK: false},
		{name: "empty tool name is not actionable", toolName: "", filePath: "/a.ts", wantPath: "", wantIsOK: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var payload Payload
			payload.ToolName = tt.toolName
			payload.ToolInput.FilePath = tt.filePath

			path, ok := payload.FilePath()
			if ok != tt.wantIsOK {
				t.Errorf("FilePath() ok = %v, want %v", ok, tt.wantIsOK)
			}
			if path != tt.wantPath {
				t.Errorf("FilePath() path = %q, want %q", path, tt.wantPath)
			}
		})
	}
}
