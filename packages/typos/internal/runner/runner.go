// Package runner tokenizes and executes .nano-staged.json command chains
// against a single file, replicating nano-staged's own execution
// semantics — see CLAUDE.md for the full design.
package runner

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/mattn/go-shellwords"
)

// Tokenize shell-word tokenizes a command string, e.g. `"oxlint --fix"` ->
// `["oxlint", "--fix"]`, matching how nano-staged splits config command
// strings before spawning them.
func Tokenize(command string) ([]string, error) {
	return shellwords.Parse(command)
}

// FindNodeModulesBin walks up from dir looking for the nearest
// node_modules/.bin directory, stopping at the filesystem root.
func FindNodeModulesBin(dir string) (path string, ok bool) {
	dir = filepath.Clean(dir)
	for {
		candidate := filepath.Join(dir, "node_modules", ".bin")
		if info, err := os.Stat(candidate); err == nil && info.IsDir() {
			return candidate, true
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			return "", false
		}
		dir = parent
	}
}

// PrependPath returns a copy of env (in os.Environ's "KEY=value" form)
// with binDir prepended to its PATH entry, matching nano-staged's own
// PATH resolution so today's bare `oxlint`/`oxfmt` commands keep
// resolving. If binDir is empty, env is returned unchanged. The PATH key
// is matched case-insensitively so this also covers Windows' "Path".
func PrependPath(env []string, binDir string) []string {
	if binDir == "" {
		return env
	}

	updated := make([]string, len(env))
	copy(updated, env)

	for i, kv := range updated {
		key, value, found := strings.Cut(kv, "=")
		if found && strings.EqualFold(key, "PATH") {
			updated[i] = key + "=" + binDir + string(os.PathListSeparator) + value
			return updated
		}
	}

	return append(updated, "PATH="+binDir)
}
