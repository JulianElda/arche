// Command typos lints/formats the single file Claude Code just wrote or
// edited, without ever touching git — see CLAUDE.md for the full design.
package main

import (
	"io"
	"os"
	"path/filepath"

	"github.com/JulianElda/arche/packages/typos/internal/hook"
	"github.com/JulianElda/arche/packages/typos/internal/nanostaged"
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

	config, configPath, ok, err := nanostaged.Discover(filepath.Dir(path))
	if !ok || err != nil {
		return 0
	}

	groups, err := config.Match(filepath.Dir(configPath), path)
	if err != nil || len(groups) == 0 {
		return 0
	}

	// TODO: command execution lands in later commits (see the
	// implementation roadmap in CLAUDE.md).
	_ = groups
	return 0
}
