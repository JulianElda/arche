package changes

import (
	"context"
	"os"
	"os/exec"
	"path/filepath"
	"reflect"
	"sort"
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
	executable := filepath.Join(dir, "git")
	writeFile(t, executable, "")
	if err := os.Chmod(executable, 0o755); err != nil {
		t.Fatalf("Chmod() error = %v", err)
	}

	got, err := findGit([]string{filepath.Join(dir, "missing"), notExecutable, dir, executable})
	if err != nil || got != executable {
		t.Errorf("findGit() = %q, %v; want %q, nil", got, err, executable)
	}

	if _, err := findGit([]string{filepath.Join(dir, "missing")}); err != ErrGitNotFound {
		t.Errorf("findGit() error = %v, want ErrGitNotFound", err)
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

func writeFile(t *testing.T, path, contents string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}
	if err := os.WriteFile(path, []byte(contents), 0o644); err != nil {
		t.Fatalf("WriteFile(%q) error = %v", path, err)
	}
}
