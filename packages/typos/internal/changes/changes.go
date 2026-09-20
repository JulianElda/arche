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
	"strings"
	"time"
)

// gitTimeout bounds the `git status` call in Since.
const gitTimeout = 5 * time.Second

// gitCandidates are the fixed, root-owned locations git is looked up in
// first, in order. They can't be shadowed, so they always win over PATH —
// see findGit for why PATH is only a fallback.
var gitCandidates = []string{
	"/usr/bin/git",
	"/bin/git",
	"/usr/local/bin/git",
	"/opt/homebrew/bin/git",
	`C:\Program Files\Git\cmd\git.exe`,
}

// ErrGitNotFound is returned by Since when git is at none of gitCandidates
// and no trusted PATH entry supplies it either.
var ErrGitNotFound = errors.New("git not found in any fixed system location or trusted PATH entry")

// Where findGit resolved git, for doctor to report. Since ignores it.
const (
	sourceFixed = "fixed location"
	sourcePATH  = "PATH"
)

// findGit returns the path git should be run from for a hook inspecting
// workTree, and where it was found.
//
// candidates come first and are preferred precisely because they can't be
// shadowed. Only if none of them exists is pathEnv walked — git isn't at a
// fixed location on every system (on NixOS it lives under
// /run/current-system/sw/bin, a per-generation profile symlink), and
// without a fallback the whole Bash/Stop path is inert there.
//
// An entry supplies git only if untrusted rejects neither the entry nor the
// binary's symlink-resolved path, so a link planted in a trusted directory
// can't point back into the repo under inspection.
// Resolution mirrors internal/runner.lookPath rather than calling
// exec.LookPath, so exec.CommandContext still receives a path resolved
// here (Sonar go:S4036).
func findGit(candidates []string, pathEnv, workTree string) (path, source string, err error) {
	for _, candidate := range candidates {
		if isExecutableFile(candidate) {
			return candidate, sourceFixed, nil
		}
	}

	name := gitBinaryName(runtime.GOOS)
	for _, dir := range filepath.SplitList(pathEnv) {
		if untrusted(dir, workTree) {
			continue
		}
		candidate := filepath.Join(dir, name)
		if !isExecutableFile(candidate) {
			continue
		}
		resolved, err := filepath.EvalSymlinks(candidate)
		if err != nil || untrusted(resolved, workTree) {
			continue
		}
		return candidate, sourcePATH, nil
	}
	return "", "", ErrGitNotFound
}

// gitBinaryName returns the filename git has on goos. Split out from findGit
// so both branches are reachable from a test on any platform.
func gitBinaryName(goos string) string {
	if goos == "windows" {
		return "git.exe"
	}
	return "git"
}

// untrusted reports whether path must not be used to supply git: an empty
// PATH entry (which means the cwd) or any relative one, anything with a
// node_modules segment — where bare lint commands resolve through, so the
// repo's own dependencies could drop a git there — or anything at or under
// workTree, the tree being inspected and therefore writable by whatever
// Claude just ran. An empty workTree contains nothing.
func untrusted(path, workTree string) bool {
	if path == "" || !filepath.IsAbs(path) {
		return true
	}
	for _, segment := range strings.Split(filepath.ToSlash(path), "/") {
		if segment == "node_modules" {
			return true
		}
	}
	if workTree == "" {
		return false
	}

	// Both sides resolved: a temp dir is itself a symlink on macOS
	// (/tmp -> /private/tmp), and an unresolved work tree would make
	// everything under it read as outside.
	rel, err := filepath.Rel(resolveSymlinks(workTree), resolveSymlinks(path))
	if err != nil {
		// No relative path exists: a relative workTree against this
		// absolute path, or different Windows volumes. Nothing is known
		// about containment, so don't extend trust.
		return true
	}
	return rel != ".." && !strings.HasPrefix(rel, ".."+string(filepath.Separator))
}

// resolveSymlinks returns path with its symlinks resolved, or path itself
// when it can't be resolved (it doesn't exist, or a link is broken).
func resolveSymlinks(path string) string {
	if resolved, err := filepath.EvalSymlinks(path); err == nil {
		return resolved
	}
	return path
}

// isExecutableFile reports whether path is a regular file with an execute
// bit. Windows carries no execute bit, so there the mode isn't consulted.
//
// path is Cleaned first only so gosec's taint analysis can see it sanitized
// (G703): every caller already passes a clean path, but one of them derives
// from PATH. Don't drop the call without re-running golangci-lint.
func isExecutableFile(path string) bool {
	info, err := os.Stat(filepath.Clean(path))
	return err == nil && info.Mode().IsRegular() && (runtime.GOOS == "windows" || info.Mode()&0o111 != 0)
}

// WorkTree reports the root of the git work tree containing dir, for
// doctor to print. Since finds it itself.
func WorkTree(dir string) (root string, ok bool) {
	return findWorkTree(dir)
}

// FindGit reports where git resolves for a hook inspecting workTree, and
// whether that was a fixed location or PATH, for doctor to print. Since
// resolves it itself.
func FindGit(workTree string) (path, source string, err error) {
	return findGit(gitCandidates, os.Getenv("PATH"), workTree)
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

	git, _, err := findGit(gitCandidates, os.Getenv("PATH"), root)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(ctx, gitTimeout)
	defer cancel()

	// Porcelain paths are always relative to the work tree root, whatever
	// the cwd. --no-renames keeps -z output to one path per entry.
	cmd := exec.CommandContext(ctx, git, "--no-optional-locks", "status", //nolint:gosec // G204: git comes from findGit, not from input
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
