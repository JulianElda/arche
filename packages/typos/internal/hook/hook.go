// Package hook parses Claude Code's PostToolUse hook JSON payload.
package hook

import (
	"encoding/json"
	"io"
)

// SupportedTools are the tool_name values this hook can resolve a single
// edited file path from. Bash calls have no single file_path to scope to.
var SupportedTools = map[string]bool{
	"Edit":      true,
	"MultiEdit": true,
	"Write":     true,
}

// Payload is the subset of Claude Code's PostToolUse hook JSON this tool
// needs. Unrecognized fields (session_id, cwd, tool_response, ...) are
// ignored by encoding/json.
type Payload struct {
	ToolName  string `json:"tool_name"`
	ToolInput struct {
		FilePath string `json:"file_path"`
	} `json:"tool_input"`
}

// Parse decodes a PostToolUse payload from r.
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
