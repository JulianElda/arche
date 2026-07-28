package nanostaged

import (
	"os"
	"path/filepath"
	"reflect"
	"testing"
)

// projectAConfig is packages/typos/CLAUDE.md's project-a example, verbatim.
const projectAConfig = `{
  "**/*.{js,jsx,ts,tsx}": ["oxlint --fix", "oxfmt"],
  "**/*.{css,html,json,yaml,yml,md}": "oxfmt",
  "**/*.svelte": ["bunx eslint --fix", "oxfmt"]
}`

func writeFile(t *testing.T, path, contents string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatalf("MkdirAll(%q) error = %v", filepath.Dir(path), err)
	}
	if err := os.WriteFile(path, []byte(contents), 0o644); err != nil {
		t.Fatalf("WriteFile(%q) error = %v", path, err)
	}
}

func TestFind_NestedBelowConfig(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, ConfigFileName), projectAConfig)

	nested := filepath.Join(root, "src", "components")
	if err := os.MkdirAll(nested, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}

	path, ok := Find(nested)
	if !ok {
		t.Fatal("Find() ok = false, want true")
	}
	want := filepath.Join(root, ConfigFileName)
	if path != want {
		t.Errorf("Find() path = %q, want %q", path, want)
	}
}

func TestFind_AtStartingDir(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, ConfigFileName), projectAConfig)

	path, ok := Find(root)
	if !ok {
		t.Fatal("Find() ok = false, want true")
	}
	want := filepath.Join(root, ConfigFileName)
	if path != want {
		t.Errorf("Find() path = %q, want %q", path, want)
	}
}

func TestFind_NoneFound(t *testing.T) {
	root := t.TempDir()
	nested := filepath.Join(root, "a", "b")
	if err := os.MkdirAll(nested, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}

	if _, ok := Find(nested); ok {
		t.Error("Find() ok = true, want false")
	}
}

func TestLoad_MixedStringAndArrayValues(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, ConfigFileName)
	writeFile(t, path, projectAConfig)

	config, err := Load(path)
	if err != nil {
		t.Fatalf("Load() error = %v", err)
	}

	want := Config{
		"**/*.{js,jsx,ts,tsx}":             {"oxlint --fix", "oxfmt"},
		"**/*.{css,html,json,yaml,yml,md}": {"oxfmt"},
		"**/*.svelte":                      {"bunx eslint --fix", "oxfmt"},
	}
	if !reflect.DeepEqual(config, want) {
		t.Errorf("Load() = %#v, want %#v", config, want)
	}
}

func TestLoad_MalformedJSON(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, ConfigFileName)
	writeFile(t, path, `{not json`)

	if _, err := Load(path); err == nil {
		t.Fatal("Load() error = nil, want an error for malformed JSON")
	}
}

func TestLoad_InvalidValueType(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, ConfigFileName)
	writeFile(t, path, `{"**/*.ts": 1}`)

	if _, err := Load(path); err == nil {
		t.Fatal("Load() error = nil, want an error for a non-string/array value")
	}
}

func TestDiscover_Found(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, ConfigFileName), projectAConfig)
	nested := filepath.Join(root, "src")
	if err := os.MkdirAll(nested, 0o755); err != nil {
		t.Fatalf("MkdirAll() error = %v", err)
	}

	config, path, ok, err := Discover(nested)
	if err != nil {
		t.Fatalf("Discover() error = %v", err)
	}
	if !ok {
		t.Fatal("Discover() ok = false, want true")
	}
	if want := filepath.Join(root, ConfigFileName); path != want {
		t.Errorf("Discover() path = %q, want %q", path, want)
	}
	if len(config) != 3 {
		t.Errorf("Discover() config has %d entries, want 3", len(config))
	}
}

func TestDiscover_NotFound(t *testing.T) {
	root := t.TempDir()

	config, path, ok, err := Discover(root)
	if err != nil {
		t.Fatalf("Discover() error = %v", err)
	}
	if ok {
		t.Error("Discover() ok = true, want false")
	}
	if config != nil {
		t.Errorf("Discover() config = %#v, want nil", config)
	}
	if path != "" {
		t.Errorf("Discover() path = %q, want empty", path)
	}
}
