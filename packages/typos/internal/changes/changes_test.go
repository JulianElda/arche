package changes

import (
	"context"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"reflect"
	"sort"
	"strings"
	"testing"
	"time"
)

func TestBeginEnd(t *testing.T) {
	dir := filepath.Join(t.TempDir(), "markers")

	if err := Begin(dir, "toolu_01ABC"); err != nil {
		t.Fatalf("Begin() error = %v", err)
	}
	start, ok := End(dir, "toolu_01ABC")
	if !ok {
		t.Fatal("End() ok = false, want true")
	}
	if time.Since(start) > time.Minute {
		t.Errorf("End() start = %v, want roughly now", start)
	}

	if _, ok := End(dir, "toolu_01ABC"); ok {
		t.Error("second End() ok = true, want false (the marker should be removed)")
	}
}

func TestEnd_NoMarker(t *testing.T) {
	if _, ok := End(t.TempDir(), "toolu_missing"); ok {
		t.Error("End() ok = true, want false")
	}
}

func TestBegin_RejectsUnsafeIDs(t *testing.T) {
	dir := t.TempDir()
	for _, id := range []string{"", "../escape", "a/b", "a.b"} {
		if err := Begin(dir, id); err == nil {
			t.Errorf("Begin(%q) error = nil, want an error", id)
		}
	}
}

func TestBeginOnce_KeepsExistingStartTime(t *testing.T) {
	dir := t.TempDir()
	if err := BeginOnce(dir, "session-1"); err != nil {
		t.Fatalf("BeginOnce() error = %v", err)
	}
	past := time.Now().Add(-time.Hour)
	if err := os.Chtimes(filepath.Join(dir, "session-1"), past, past); err != nil {
		t.Fatalf("Chtimes() error = %v", err)
	}

	if err := BeginOnce(dir, "session-1"); err != nil {
		t.Fatalf("second BeginOnce() error = %v", err)
	}
	start, ok := Peek(dir, "session-1")
	if !ok || !start.Equal(past) {
		t.Errorf("Peek() = %v, %v; want %v, true", start, ok, past)
	}
	if _, ok := Peek(dir, "session-1"); !ok {
		t.Error("Peek() removed the marker, want it left in place")
	}
}

func TestRename_MovesStartTime(t *testing.T) {
	dir := t.TempDir()
	past := time.Now().Add(-time.Hour)
	if err := Begin(dir, "old"); err != nil {
		t.Fatalf("Begin() error = %v", err)
	}
	if err := Begin(dir, "next"); err != nil {
		t.Fatalf("Begin() error = %v", err)
	}
	if err := os.Chtimes(filepath.Join(dir, "next"), past, past); err != nil {
		t.Fatalf("Chtimes() error = %v", err)
	}

	if err := Rename(dir, "next", "old"); err != nil {
		t.Fatalf("Rename() error = %v", err)
	}
	if start, ok := Peek(dir, "old"); !ok || !start.Equal(past) {
		t.Errorf("Peek(old) = %v, %v; want %v, true", start, ok, past)
	}
	if _, ok := Peek(dir, "next"); ok {
		t.Error("Peek(next) ok = true, want the renamed marker gone")
	}
}

func TestSince(t *testing.T) {
	root := t.TempDir()
	git(t, root, "init", "-q")
	writeFile(t, filepath.Join(root, ".gitignore"), "ignored.ts\n")
	writeFile(t, filepath.Join(root, "tracked.ts"), "export {}")
	writeFile(t, filepath.Join(root, "untouched.ts"), "export {}")
	writeFile(t, filepath.Join(root, "dirty-before.ts"), "export {}")
	git(t, root, "add", ".")
	git(t, root, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "init")

	// Already dirty before the call started: must not be picked up.
	past := time.Now().Add(-time.Hour)
	writeFile(t, filepath.Join(root, "dirty-before.ts"), "export const a = 1")
	if err := os.Chtimes(filepath.Join(root, "dirty-before.ts"), past, past); err != nil {
		t.Fatalf("Chtimes() error = %v", err)
	}

	start := time.Now().Add(-time.Second)
	writeFile(t, filepath.Join(root, "tracked.ts"), "export const b = 2")
	writeFile(t, filepath.Join(root, "src", "nested", "new.ts"), "export {}")
	writeFile(t, filepath.Join(root, "ignored.ts"), "export {}")

	// Run from a subdirectory: results must still cover the whole work tree.
	sub := filepath.Join(root, "src")
	got, err := Since(context.Background(), sub, start)
	if err != nil {
		t.Fatalf("Since() error = %v", err)
	}
	sort.Strings(got)
	want := []string{
		filepath.Join(root, "src", "nested", "new.ts"),
		filepath.Join(root, "tracked.ts"),
	}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("Since() = %#v, want %#v", got, want)
	}
}

func TestFindGit_SkipsMissingAndNonExecutable(t *testing.T) {
	dir := t.TempDir()
	notExecutable := filepath.Join(dir, "not-executable")
	writeFile(t, notExecutable, "")
	executable := writeExecutable(t, dir, "git")

	got, source, err := findGit([]string{filepath.Join(dir, "missing"), notExecutable, dir, executable}, "", "")
	if err != nil || got != executable || source != sourceFixed {
		t.Errorf("findGit() = %q, %q, %v; want %q, %q, nil", got, source, err, executable, sourceFixed)
	}

	if _, _, err := findGit([]string{filepath.Join(dir, "missing")}, "", ""); !errors.Is(err, ErrGitNotFound) {
		t.Errorf("findGit() error = %v, want ErrGitNotFound", err)
	}
}

func TestFindGit_PrefersAFixedCandidateOverPath(t *testing.T) {
	fixed := writeExecutable(t, t.TempDir(), "git")
	onPath := t.TempDir()
	writeExecutable(t, onPath, "git")

	got, source, err := findGit([]string{fixed}, onPath, t.TempDir())
	if err != nil || got != fixed || source != sourceFixed {
		t.Errorf("findGit() = %q, %q, %v; want %q, %q, nil", got, source, err, fixed, sourceFixed)
	}
}

func TestFindGit_ResolvesViaPathWhenNoFixedCandidate(t *testing.T) {
	dir := t.TempDir()
	want := writeExecutable(t, dir, "git")

	// Every fixed candidate absent, as on NixOS, where git lives under a
	// per-generation profile symlink none of them names.
	got, source, err := findGit([]string{filepath.Join(dir, "missing")}, dir, t.TempDir())
	if err != nil || got != want || source != sourcePATH {
		t.Errorf("findGit() = %q, %q, %v; want %q, %q, nil", got, source, err, want, sourcePATH)
	}
}

// TestFindGit_RefusesUntrustedPathEntries covers the hole the PATH fallback
// must not reopen: a directory Claude's own tool calls could write to must
// never supply git, however early it sits on PATH.
//
// Every untrusted entry's git is a symlink to a binary that is itself
// beyond reproach, so resolving it reveals nothing wrong and the entry
// alone is grounds for refusal. That is the real threat: a writable PATH
// directory doesn't have to host the payload, only point at it.
func TestFindGit_RefusesUntrustedPathEntries(t *testing.T) {
	workTree := t.TempDir()
	innocent := writeExecutable(t, t.TempDir(), "real-git")

	// An empty entry and a relative one both mean the cwd, which only has
	// meaning against a real one. t.Chdir restores it after the test.
	cwd := t.TempDir()
	t.Chdir(cwd)
	relative := "relative-bin"

	untrustedEntries := []string{
		filepath.Join(workTree, ".direnv", "bin"), // real, from this repo's own hook environment
		filepath.Join(t.TempDir(), "node_modules", ".bin"),
		cwd,                          // what the empty entry names
		filepath.Join(cwd, relative), // what the relative entry names
	}
	for _, dir := range untrustedEntries {
		if err := os.Symlink(innocent, filepath.Join(mkdir(t, dir), "git")); err != nil {
			t.Fatalf("Symlink() error = %v", err)
		}
	}

	want := writeExecutable(t, t.TempDir(), "git")
	ordered := []string{"", relative, untrustedEntries[0], untrustedEntries[1]}

	got, source, err := findGit(nil, pathList(append(ordered, filepath.Dir(want))...), workTree)
	if err != nil || got != want || source != sourcePATH {
		t.Errorf("findGit() = %q, %q, %v; want %q, %q, nil (only the trusted entry may supply git)", got, source, err, want, sourcePATH)
	}

	// With no trusted entry there is no fallback at all, rather than the
	// first untrusted one.
	if _, _, err := findGit(nil, pathList(ordered...), workTree); !errors.Is(err, ErrGitNotFound) {
		t.Errorf("findGit() error = %v, want ErrGitNotFound", err)
	}
}

func TestFindGit_RefusesASymlinkIntoTheWorkTree(t *testing.T) {
	workTree := t.TempDir()
	evil := writeExecutable(t, mkdir(t, filepath.Join(workTree, "evil")), "git")

	// The entry itself is outside the work tree and passes every check; only
	// resolving its git reveals where it really points.
	trap := t.TempDir()
	if err := os.Symlink(evil, filepath.Join(trap, "git")); err != nil {
		t.Fatalf("Symlink() error = %v", err)
	}

	want := writeExecutable(t, t.TempDir(), "git")
	got, source, err := findGit(nil, pathList(trap, filepath.Dir(want)), workTree)
	if err != nil || got != want || source != sourcePATH {
		t.Errorf("findGit() = %q, %q, %v; want %q, %q, nil (the symlink into the work tree must be skipped)", got, source, err, want, sourcePATH)
	}
}

func TestGitBinaryName(t *testing.T) {
	if got := gitBinaryName("windows"); got != "git.exe" {
		t.Errorf("gitBinaryName(\"windows\") = %q, want \"git.exe\"", got)
	}
	for _, goos := range []string{"linux", "darwin"} {
		if got := gitBinaryName(goos); got != "git" {
			t.Errorf("gitBinaryName(%q) = %q, want \"git\"", goos, got)
		}
	}
}

// TestFindGit_WithoutAWorkTreeRefusesNothingOnContainment covers Since's
// out-of-work-tree case: there's no tree to be inside, so only the other two
// rules apply.
func TestFindGit_WithoutAWorkTreeRefusesNothingOnContainment(t *testing.T) {
	dir := t.TempDir()
	want := writeExecutable(t, dir, "git")

	got, source, err := findGit(nil, dir, "")
	if err != nil || got != want || source != sourcePATH {
		t.Errorf("findGit() = %q, %q, %v; want %q, %q, nil", got, source, err, want, sourcePATH)
	}
}

// TestFindGit_RefusesEverythingForARelativeWorkTree pins the fail-closed
// behavior when containment can't be decided: filepath.Rel has no answer for a
// relative work tree against an absolute entry, and an undecidable answer must
// not become trust.
func TestFindGit_RefusesEverythingForARelativeWorkTree(t *testing.T) {
	dir := t.TempDir()
	writeExecutable(t, dir, "git")

	if _, _, err := findGit(nil, dir, "some/relative/tree"); !errors.Is(err, ErrGitNotFound) {
		t.Errorf("findGit() error = %v, want ErrGitNotFound", err)
	}
}

// TestWorkTree and TestFindGit_Exported cover the two wrappers doctor calls.
// main_test.go exercises them too, but cross-package calls don't count toward
// this package's coverage profile.
func TestWorkTree(t *testing.T) {
	dir := t.TempDir()
	if root, ok := WorkTree(dir); ok {
		t.Errorf("WorkTree() = %q, %t; want \"\", false outside a work tree", root, ok)
	}

	writeFile(t, filepath.Join(dir, ".git", "HEAD"), "ref: refs/heads/main\n")
	sub := mkdir(t, filepath.Join(dir, "src", "nested"))
	if root, ok := WorkTree(sub); !ok || root != dir {
		t.Errorf("WorkTree() = %q, %t; want %q, true", root, ok, dir)
	}
}

func TestFindGit_Exported(t *testing.T) {
	// Resolves against the real PATH and gitCandidates; the tests already
	// require a usable git, so it must find one.
	got, source, err := FindGit(t.TempDir())
	if err != nil {
		t.Fatalf("FindGit() error = %v", err)
	}
	if !isExecutableFile(got) {
		t.Errorf("FindGit() = %q, want an executable file", got)
	}
	if source != sourceFixed && source != sourcePATH {
		t.Errorf("FindGit() source = %q, want %q or %q", source, sourceFixed, sourcePATH)
	}
}

func TestSince_OutsideGitIsNil(t *testing.T) {
	got, err := Since(context.Background(), t.TempDir(), time.Time{})
	if err != nil || got != nil {
		t.Errorf("Since() = %#v, %v; want nil, nil", got, err)
	}
}

func git(t *testing.T, dir string, args ...string) {
	t.Helper()
	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	if out, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("git %v error = %v\n%s", args, err, out)
	}
}

// writeExecutable writes an empty executable file to dir/name and returns
// its path — a stand-in git, only ever stat'd, never run.
func writeExecutable(t *testing.T, dir, name string) string {
	t.Helper()
	path := filepath.Join(dir, name)
	writeFile(t, path, "")
	if err := os.Chmod(path, 0o755); err != nil {
		t.Fatalf("Chmod(%q) error = %v", path, err)
	}
	return path
}

// mkdir creates dir and returns it, for use inline as an argument.
func mkdir(t *testing.T, dir string) string {
	t.Helper()
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatalf("MkdirAll(%q) error = %v", dir, err)
	}
	return dir
}

// pathList joins entries the way PATH does on this platform.
func pathList(entries ...string) string {
	return strings.Join(entries, string(os.PathListSeparator))
}

func writeFile(t *testing.T, path, contents string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}
	if err := os.WriteFile(path, []byte(contents), 0o644); err != nil {
		t.Fatalf("WriteFile(%q) error = %v", path, err)
	}
}
