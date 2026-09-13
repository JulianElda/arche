// Package changes works out which files a Bash tool call modified, since
// Bash hook payloads carry no file_path. A PreToolUse hook records when the
// call started (Begin); the matching PostToolUse hook reads that back (End)
// and asks git which files are dirty and were modified since (Since).
//
// git is only ever read, never written: Since runs `git status` with
// --no-optional-locks so it doesn't even take index.lock to refresh stat
// info, and can't collide with git commands Claude runs concurrently.
package changes

import (
	"bytes"
	"context"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

// gitTimeout bounds the `git status` call in Since.
const gitTimeout = 5 * time.Second

// MarkerDir is where Begin records in-flight Bash calls.
func MarkerDir() string {
	return filepath.Join(os.TempDir(), "typos")
}

// Begin records that the tool call id is about to run, as an empty marker
// file under dir. The marker's own mtime is the start time: the kernel
// stamps file mtimes from a coarse clock that can lag time.Now() by a
// tick, so comparing against another file's mtime (rather than a
// time.Now() taken here) can't miss a file edited right after Begin.
func Begin(dir, id string) error {
	if !validID(id) {
		return os.ErrInvalid
	}
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return err
	}
	f, err := os.Create(filepath.Join(dir, id))
	if err != nil {
		return err
	}
	return f.Close()
}

// End returns the start time Begin recorded for id and removes its marker.
// ok is false if there's no marker, e.g. the PreToolUse hook isn't wired up.
func End(dir, id string) (start time.Time, ok bool) {
	if !validID(id) {
		return time.Time{}, false
	}
	marker := filepath.Join(dir, id)
	info, err := os.Stat(marker)
	if err != nil {
		return time.Time{}, false
	}
	os.Remove(marker)
	return info.ModTime(), true
}

// Since returns the absolute paths of regular files in the git work tree
// containing dir that git reports as changed (modified, added or
// untracked-but-not-ignored) and whose mtime is at or after start — so
// files that were already dirty before the call aren't picked up. Outside
// a git work tree it returns nil.
func Since(ctx context.Context, dir string, start time.Time) ([]string, error) {
	root, ok := findWorkTree(dir)
	if !ok {
		return nil, nil
	}

	ctx, cancel := context.WithTimeout(ctx, gitTimeout)
	defer cancel()

	// Porcelain paths are always relative to the work tree root, whatever
	// the cwd. --no-renames keeps -z output to one path per entry.
	cmd := exec.CommandContext(ctx, "git", "--no-optional-locks", "status",
		"--porcelain=v1", "-z", "--untracked-files=all", "--no-renames", "--ignore-submodules=all")
	cmd.Dir = root
	out, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	var changed []string
	for _, entry := range bytes.Split(out, []byte{0}) {
		// Each entry is "XY <path>".
		if len(entry) < 4 {
			continue
		}
		path := filepath.Join(root, filepath.FromSlash(string(entry[3:])))
		info, err := os.Lstat(path)
		if err != nil || !info.Mode().IsRegular() || info.ModTime().Before(start) {
			continue
		}
		changed = append(changed, path)
	}
	return changed, nil
}

// findWorkTree walks up from dir looking for a .git entry — a directory,
// or a file for worktrees and submodules — stopping at the filesystem root.
func findWorkTree(dir string) (root string, ok bool) {
	dir, err := filepath.Abs(dir)
	if err != nil {
		return "", false
	}
	for {
		if _, err := os.Lstat(filepath.Join(dir, ".git")); err == nil {
			return dir, true
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			return "", false
		}
		dir = parent
	}
}

// validID reports whether id is safe to use as a marker filename. Claude
// Code's tool_use_id values look like "toolu_01ABC...".
func validID(id string) bool {
	if id == "" || len(id) > 255 {
		return false
	}
	for _, r := range id {
		isAlnum := r >= 'a' && r <= 'z' || r >= 'A' && r <= 'Z' || r >= '0' && r <= '9'
		if !isAlnum && r != '_' && r != '-' {
			return false
		}
	}
	return true
}
