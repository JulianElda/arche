// Command typos lints/formats the single file Claude Code just wrote or
// edited, without ever touching git — see CLAUDE.md for the full design.
package main

import (
	"io"
	"os"

	"github.com/JulianElda/arche/packages/typos/internal/hook"
)

func main() {
	os.Exit(run(os.Stdin))
}

// run reads a PostToolUse payload from r and returns the process exit code.
func run(r io.Reader) int {
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

	// TODO: config discovery, glob matching, and command execution land in
	// later commits (see the implementation roadmap in CLAUDE.md).
	_ = path
	return 0
}
