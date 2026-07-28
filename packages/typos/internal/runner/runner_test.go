package runner

import (
	"os"
	"path/filepath"
	"reflect"
	"testing"
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
