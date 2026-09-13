// Package hook parses Claude Code's PreToolUse/PostToolUse hook JSON payload.
package hook

import (
	"encoding/json"
	"io"
)

// PreToolUse is the hook_event_name of a payload sent before a tool runs.
const PreToolUse = "PreToolUse"

// BashTool is the tool_name of a Bash call, whose changed files have to be
// worked out after the fact — see internal/changes.
const BashTool = "Bash"

// SupportedTools are the tool_name values this hook can resolve a single
// edited file path from. Bash calls have no single file_path to scope to.
var SupportedTools = map[string]bool{
	"Edit":      true,
	"MultiEdit": true,
	"Write":     true,
}

// Payload is the subset of Claude Code's tool hook JSON this tool needs.
// Unrecognized fields (session_id, tool_response, ...) are ignored by
// encoding/json.
type Payload struct {
	HookEventName string `json:"hook_event_name"`
	ToolName      string `json:"tool_name"`
	ToolUseID     string `json:"tool_use_id"`
	Cwd           string `json:"cwd"`
	ToolInput     struct {
		FilePath string `json:"file_path"`
	} `json:"tool_input"`
}

// Parse decodes a tool hook payload from r.
func Parse(r io.Reader) (Payload, error) {
	var payload Payload
	if err := json.NewDecoder(r).Decode(&payload); err != nil {
		return Payload{}, err
	}
	return payload, nil
}

// FilePath returns the edited file path and whether this payload is
// actionable at all: a supported tool with a non-empty file path.
func (p Payload) FilePath() (string, bool) {
	if !SupportedTools[p.ToolName] || p.ToolInput.FilePath == "" {
		return "", false
	}
	return p.ToolInput.FilePath, true
}
