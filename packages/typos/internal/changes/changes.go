// Package changes works out which files were modified during some window,
// for hook payloads that carry no file_path. A marker file records when the
// window started (Begin, BeginOnce), a later hook reads that back (Peek,
// End) and asks git which files are dirty and were modified since (Since).
// Bash tool calls use one marker per tool_use_id; the Stop sweep uses one
// per session.
//
// git is only ever read, never written: Since runs `git status` with
// --no-optional-locks so it doesn't even take index.lock to refresh stat
// info, and can't collide with git commands Claude runs concurrently.
package changes

import (
	"bytes"
	"context"
	"errors"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"
)

// gitTimeout bounds the `git status` call in Since.
const gitTimeout = 5 * time.Second

// gitCandidates are the fixed, root-owned locations git is looked up in, in
// order. PATH is deliberately not searched: a writable directory on it (like
// the node_modules/.bin that bare lint commands resolve through) could
// shadow git with anything.
var gitCandidates = []string{
	"/usr/bin/git",
	"/bin/git",
	"/usr/local/bin/git",
	"/opt/homebrew/bin/git",
	`C:\Program Files\Git\cmd\git.exe`,
}

// ErrGitNotFound is returned by Since when git isn't at any of
// gitCandidates.
var ErrGitNotFound = errors.New("git not found in any fixed system location")

// findGit returns the first of candidates that is an executable regular
// file.
func findGit(candidates []string) (string, error) {
	for _, candidate := range candidates {
		info, err := os.Stat(candidate)
		if err == nil && info.Mode().IsRegular() && (runtime.GOOS == "windows" || info.Mode()&0o111 != 0) {
			return candidate, nil
		}
	}
	return "", ErrGitNotFound
}

// MarkerDir is where markers are recorded: a typos directory in the
// user's own cache directory (e.g. ~/.cache/typos on Linux). Not the shared
// temp dir — there another local user could create the predictable
// /tmp/typos first, and own or symlink the markers inside it.
func MarkerDir() (string, error) {
	cache, err := os.UserCacheDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(cache, "typos"), nil
}

// Begin records that the window id starts now, as an empty marker file
// under dir, replacing any existing marker for id. The marker's own mtime is the start time: the kernel
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
	// Recreate rather than truncate, so an existing marker gets a fresh
	// kernel-stamped mtime.
	marker := filepath.Join(dir, id)
	_ = os.Remove(marker)
	f, err := os.Create(marker) //nolint:gosec // G304: validID keeps id a bare filename inside dir
	if err != nil {
		return err
	}
	return f.Close()
}

// BeginOnce is Begin, except an existing marker for id — and the start
// time it records — is left alone.
func BeginOnce(dir, id string) error {
	if !validID(id) {
		return os.ErrInvalid
	}
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return err
	}
	f, err := os.OpenFile(filepath.Join(dir, id), os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o600) //nolint:gosec // G304: validID keeps id a bare filename inside dir
	if errors.Is(err, fs.ErrExist) {
		return nil
	}
	if err != nil {
		return err
	}
	return f.Close()
}

// Peek returns the start time recorded for id, leaving its marker in place.
// ok is false if there's no marker, e.g. the hook that records it isn't
// wired up.
func Peek(dir, id string) (start time.Time, ok bool) {
	if !validID(id) {
		return time.Time{}, false
	}
	info, err := os.Stat(filepath.Join(dir, id))
	if err != nil {
		return time.Time{}, false
	}
	return info.ModTime(), true
}

// End is Peek, but also removes id's marker.
func End(dir, id string) (start time.Time, ok bool) {
	start, ok = Peek(dir, id)
	if ok {
		_ = os.Remove(filepath.Join(dir, id))
	}
	return start, ok
}

// Rename replaces the marker for to with the marker for from, keeping
// from's start time. The kernel stamps no new mtime on rename, so this is
// how a marker's start time is moved forward without a time.Now().
func Rename(dir, from, to string) error {
	if !validID(from) || !validID(to) {
		return os.ErrInvalid
	}
	return os.Rename(filepath.Join(dir, from), filepath.Join(dir, to))
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

	git, err := findGit(gitCandidates)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(ctx, gitTimeout)
	defer cancel()

	// Porcelain paths are always relative to the work tree root, whatever
	// the cwd. --no-renames keeps -z output to one path per entry.
	cmd := exec.CommandContext(ctx, git, "--no-optional-locks", "status", //nolint:gosec // G204: git comes from gitCandidates, not input
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
