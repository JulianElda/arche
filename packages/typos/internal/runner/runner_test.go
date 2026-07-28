package runner

import (
	"context"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/JulianElda/arche/packages/typos/internal/nanostaged"
)

func TestTokenize(t *testing.T) {
	tests := []struct {
		name    string
		command string
		want    []string
	}{
		{name: "bare command", command: "oxfmt", want: []string{"oxfmt"}},
		{name: "command with flag", command: "oxlint --fix", want: []string{"oxlint", "--fix"}},
		{name: "quoted argument with spaces", command: `echo "hello world"`, want: []string{"echo", "hello world"}},
		{name: "extra whitespace", command: "  oxfmt   --write  ", want: []string{"oxfmt", "--write"}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Tokenize(tt.command)
			if err != nil {
				t.Fatalf("Tokenize() error = %v", err)
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Tokenize() = %#v, want %#v", got, tt.want)
			}
		})
	}
}

func TestTokenize_UnclosedQuoteIsAnError(t *testing.T) {
	if _, err := Tokenize(`echo "unterminated`); err == nil {
		t.Fatal("Tokenize() error = nil, want an error for an unterminated quote")
	}
}

func TestFindNodeModulesBin(t *testing.T) {
	root := t.TempDir()
	binDir := filepath.Join(root, "node_modules", ".bin")
	if err := os.MkdirAll(binDir, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}

	nested := filepath.Join(root, "src", "components")
	if err := os.MkdirAll(nested, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}

	path, ok := FindNodeModulesBin(nested)
	if !ok {
		t.Fatal("FindNodeModulesBin() ok = false, want true")
	}
	if path != binDir {
		t.Errorf("FindNodeModulesBin() path = %q, want %q", path, binDir)
	}
}

func TestFindNodeModulesBin_NoneFound(t *testing.T) {
	root := t.TempDir()
	if _, ok := FindNodeModulesBin(root); ok {
		t.Error("FindNodeModulesBin() ok = true, want false")
	}
}

func TestPrependPath_ExistingPathEntry(t *testing.T) {
	env := []string{"HOME=/home/user", "PATH=/usr/bin:/bin"}
	got := PrependPath(env, "/repo/node_modules/.bin")

	want := []string{"HOME=/home/user", "PATH=/repo/node_modules/.bin" + string(os.PathListSeparator) + "/usr/bin:/bin"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("PrependPath() = %#v, want %#v", got, want)
	}
}

func TestPrependPath_CaseInsensitiveKey(t *testing.T) {
	env := []string{"Path=C:\\Windows"}
	got := PrependPath(env, "/repo/node_modules/.bin")

	want := []string{"Path=/repo/node_modules/.bin" + string(os.PathListSeparator) + "C:\\Windows"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("PrependPath() = %#v, want %#v", got, want)
	}
}

func TestPrependPath_NoExistingPathEntry(t *testing.T) {
	env := []string{"HOME=/home/user"}
	got := PrependPath(env, "/repo/node_modules/.bin")

	want := []string{"HOME=/home/user", "PATH=/repo/node_modules/.bin"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("PrependPath() = %#v, want %#v", got, want)
	}
}

func TestPrependPath_EmptyBinDirIsNoOp(t *testing.T) {
	env := []string{"PATH=/usr/bin"}
	got := PrependPath(env, "")

	if !reflect.DeepEqual(got, env) {
		t.Errorf("PrependPath() = %#v, want %#v (unchanged)", got, env)
	}
}

// writeScript writes an executable shell script to dir/name and returns
// its absolute path.
func writeScript(t *testing.T, dir, name, contents string) string {
	t.Helper()
	path := filepath.Join(dir, name)
	if err := os.WriteFile(path, []byte("#!/bin/sh\n"+contents), 0o755); err != nil {
		t.Fatalf("WriteFile(%q) error = %v", path, err)
	}
	return path
}

func TestRun_AllCommandsSucceed(t *testing.T) {
	repoRoot := t.TempDir()
	ok := writeScript(t, repoRoot, "ok.sh", "exit 0\n")
	groups := []nanostaged.MatchedGroup{{Pattern: "**/*.ts", Commands: []string{ok}}}

	if failure := Run(context.Background(), groups, filepath.Join(repoRoot, "a.ts"), repoRoot, time.Second); failure != nil {
		t.Errorf("Run() = %#v, want nil", failure)
	}
}

func TestRun_CapturesExitCodeAndStderr(t *testing.T) {
	repoRoot := t.TempDir()
	failing := writeScript(t, repoRoot, "fail.sh", "echo boom >&2\nexit 3\n")
	groups := []nanostaged.MatchedGroup{{Pattern: "**/*.ts", Commands: []string{failing}}}

	failure := Run(context.Background(), groups, filepath.Join(repoRoot, "a.ts"), repoRoot, time.Second)
	if failure == nil {
		t.Fatal("Run() = nil, want a failure")
	}
	if failure.ExitCode != 3 {
		t.Errorf("ExitCode = %d, want 3", failure.ExitCode)
	}
	if !strings.Contains(failure.Stderr, "boom") {
		t.Errorf("Stderr = %q, want it to contain %q", failure.Stderr, "boom")
	}
	if failure.Pattern != "**/*.ts" {
		t.Errorf("Pattern = %q, want %q", failure.Pattern, "**/*.ts")
	}
}

func TestRun_BailsOnFirstFailureWithinGroup(t *testing.T) {
	repoRoot := t.TempDir()
	failing := writeScript(t, repoRoot, "fail.sh", "exit 1\n")
	marker := filepath.Join(repoRoot, "marker")
	second := writeScript(t, repoRoot, "second.sh", "touch "+marker+"\n")
	groups := []nanostaged.MatchedGroup{{Pattern: "**/*.ts", Commands: []string{failing, second}}}

	failure := Run(context.Background(), groups, filepath.Join(repoRoot, "a.ts"), repoRoot, time.Second)
	if failure == nil {
		t.Fatal("Run() = nil, want a failure")
	}
	if failure.Command != failing {
		t.Errorf("Command = %q, want %q (the first, failing command)", failure.Command, failing)
	}
	if _, err := os.Stat(marker); err == nil {
		t.Error("the second command ran despite the first one failing")
	}
}

func TestRun_GroupsRunConcurrently(t *testing.T) {
	repoRoot := t.TempDir()
	slow := writeScript(t, repoRoot, "slow.sh", "sleep 0.2\n")
	groups := []nanostaged.MatchedGroup{
		{Pattern: "**/*.ts", Commands: []string{slow}},
		{Pattern: "**/*.css", Commands: []string{slow}},
	}

	start := time.Now()
	if failure := Run(context.Background(), groups, filepath.Join(repoRoot, "a.ts"), repoRoot, time.Second); failure != nil {
		t.Fatalf("Run() = %#v, want nil", failure)
	}
	if elapsed := time.Since(start); elapsed > 350*time.Millisecond {
		t.Errorf("Run() took %s, want well under 400ms (two 200ms groups should overlap, not stack)", elapsed)
	}
}

func TestRun_AppendsFilePathAsTrailingArgUnderRepoRootCwd(t *testing.T) {
	repoRoot := t.TempDir()
	echoArg := writeScript(t, repoRoot, "echo-arg.sh", `echo "$1" > out.txt`+"\n")
	groups := []nanostaged.MatchedGroup{{Pattern: "**/*.ts", Commands: []string{echoArg}}}

	filePath := filepath.Join(repoRoot, "a.ts")
	if failure := Run(context.Background(), groups, filePath, repoRoot, time.Second); failure != nil {
		t.Fatalf("Run() = %#v, want nil", failure)
	}

	got, err := os.ReadFile(filepath.Join(repoRoot, "out.txt"))
	if err != nil {
		t.Fatalf("ReadFile() error = %v", err)
	}
	if want := filePath + "\n"; string(got) != want {
		t.Errorf("out.txt = %q, want %q", got, want)
	}
}

func TestRun_PrependsNodeModulesBinToPATH(t *testing.T) {
	repoRoot := t.TempDir()
	binDir := filepath.Join(repoRoot, "node_modules", ".bin")
	if err := os.MkdirAll(binDir, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}
	writeScript(t, binDir, "fakelint", "exit 0\n")
	groups := []nanostaged.MatchedGroup{{Pattern: "**/*.ts", Commands: []string{"fakelint"}}}

	if failure := Run(context.Background(), groups, filepath.Join(repoRoot, "a.ts"), repoRoot, time.Second); failure != nil {
		t.Errorf("Run() = %#v, want nil (fakelint should resolve via the prepended PATH)", failure)
	}
}

func TestRun_TimeoutAbortsTheCommand(t *testing.T) {
	repoRoot := t.TempDir()
	slow := writeScript(t, repoRoot, "slow.sh", "sleep 1\n")
	groups := []nanostaged.MatchedGroup{{Pattern: "**/*.ts", Commands: []string{slow}}}

	failure := Run(context.Background(), groups, filepath.Join(repoRoot, "a.ts"), repoRoot, 50*time.Millisecond)
	if failure == nil {
		t.Fatal("Run() = nil, want a failure from the timeout")
	}
}
