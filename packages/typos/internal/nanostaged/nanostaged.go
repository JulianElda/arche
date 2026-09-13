// Package nanostaged discovers and parses a repo's .nano-staged.json,
// verbatim — see CLAUDE.md for why the config format isn't reinvented.
package nanostaged

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sort"

	"github.com/bmatcuk/doublestar/v4"
)

// ConfigFileName is the config file this package looks for, matching the
// one nano-staged itself reads for the git pre-commit path.
const ConfigFileName = ".nano-staged.json"

// Config maps a glob pattern to the ordered list of commands to run
// against a file it matches.
type Config map[string][]string

// Find walks up from dir looking for the nearest .nano-staged.json,
// stopping at the filesystem root. ok is false if none was found.
func Find(dir string) (path string, ok bool) {
	dir = filepath.Clean(dir)
	for {
		candidate := filepath.Join(dir, ConfigFileName)
		if info, err := os.Stat(candidate); err == nil && !info.IsDir() {
			return candidate, true
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			return "", false
		}
		dir = parent
	}
}

// Load reads and parses the .nano-staged.json file at path. Each pattern's
// value may be a single command string or an array of command strings;
// both shapes are normalized to []string.
func Load(path string) (Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var raw map[string]json.RawMessage
	if err := json.Unmarshal(data, &raw); err != nil {
		return nil, err
	}

	config := make(Config, len(raw))
	for pattern, value := range raw {
		commands, err := normalizeCommands(value)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", pattern, err)
		}
		config[pattern] = commands
	}
	return config, nil
}

func normalizeCommands(value json.RawMessage) ([]string, error) {
	var single string
	if err := json.Unmarshal(value, &single); err == nil {
		return []string{single}, nil
	}

	var multiple []string
	if err := json.Unmarshal(value, &multiple); err == nil {
		return multiple, nil
	}

	return nil, errors.New("value must be a string or an array of strings")
}

// Discover finds and loads the nearest .nano-staged.json to dir. ok is
// false if none was found; err is non-nil only when a config file was
// found but failed to parse.
func Discover(dir string) (config Config, path string, ok bool, err error) {
	path, found := Find(dir)
	if !found {
		return nil, "", false, nil
	}

	config, err = Load(path)
	if err != nil {
		return nil, path, true, err
	}
	return config, path, true, nil
}

// MatchedGroup pairs a glob pattern with the command chain to run and the
// files it matched, which get appended to each command as trailing args.
type MatchedGroup struct {
	Pattern  string
	Commands []string
	Files    []string
}

// Match returns the pattern groups whose glob matches at least one of
// paths, relative to configDir (the directory the config file was loaded
// from). Each group's Files keeps paths' order. Group order is
// deterministic (sorted by pattern) but otherwise not meaningful — matched
// groups are run concurrently, not in this order.
func (c Config) Match(configDir string, paths ...string) ([]MatchedGroup, error) {
	rels := make([]string, len(paths))
	for i, path := range paths {
		rel, err := filepath.Rel(configDir, path)
		if err != nil {
			return nil, err
		}
		rels[i] = filepath.ToSlash(rel)
	}

	patterns := make([]string, 0, len(c))
	for pattern := range c {
		patterns = append(patterns, pattern)
	}
	sort.Strings(patterns)

	var matched []MatchedGroup
	for _, pattern := range patterns {
		var files []string
		for i, rel := range rels {
			ok, err := doublestar.Match(pattern, rel)
			if err != nil {
				return nil, fmt.Errorf("%s: %w", pattern, err)
			}
			if ok {
				files = append(files, paths[i])
			}
		}
		if len(files) > 0 {
			matched = append(matched, MatchedGroup{Pattern: pattern, Commands: c[pattern], Files: files})
		}
	}
	return matched, nil
}
