# typos — design brief

This is the authoritative design reference for this package. Implementation
should follow it exactly unless the user says otherwise.

## Goal

Build a reusable, installable-via-npm package that replaces the hand-rolled
`~/.claude/hooks/lint-edited-file.sh` Claude Code hook script. It should do the
same job — lint/format the single file Claude just wrote/edited — but be a
proper versioned package instead of a bespoke bash script living in dotfiles,
so it can be installed the same way across every repo.

## The problem that started this

All repos use [nano-staged](https://github.com/usmanyunusov/nano-staged) as a
git pre-commit hook (via `lefthook`) to lint/format staged files. Inspired by
[this evilmartians article](https://evilmartians.com/chronicles/stop-writing-rules-in-agents-md-use-agent-hooks-and-nano-staged-instead),
the same idea was extended to Claude Code itself: run the linter/formatter
automatically after Claude edits a file, instead of writing style rules into
AGENTS.md/CLAUDE.md and hoping the model follows them.

The naive approach — literally invoking `nano-staged` from a Claude Code
PostToolUse hook — has a critical, previously-hit bug: nano-staged operates by
git-stashing unstaged changes, applying to the index, running commands, then
restoring. Under concurrent invocations (Claude can fire multiple parallel
Write/Edit tool calls), this stash/apply/restore sequence can race and
**hard-reset the whole repo, silently discarding all unstaged changes**. This
already happened once and is the reason a replacement was built rather than
wiring nano-staged directly into the hook.

The current stopgap, `lint-edited-file.sh`, mimics nano-staged's job but
sidesteps the bug entirely by **never touching git** — it takes the single
file path Claude just edited (from the hook's JSON payload) and runs the
formatter/linter directly against that one file. No staging, no stash, no
index manipulation, so there's nothing to race.

## Current implementation (what's being replaced)

`~/.claude/settings.json` hook wiring:

```json
"hooks": {
  "PostToolUse": [
    {
      "matcher": "Write|Edit|MultiEdit|Bash",
      "hooks": [
        {
          "type": "command",
          "command": "~/.claude/hooks/lint-edited-file.sh"
        }
      ]
    }
  ]
}
```

`~/.claude/hooks/lint-edited-file.sh` (full contents):

```bash
#!/usr/bin/env bash
set -uo pipefail

OXLINT_CONFIG=~/nano-staged-hook/oxlintrc.json
OXFMT_CONFIG=~/nano-staged-hook/oxfmtrc.json

payload="$(cat)"
file_path="$(jq -r '.tool_input.file_path // empty' <<<"$payload")"

# Bash tool calls have no single file_path — nothing safe to scope to here.
# Full-repo consistency still gets checked by the Stop hook.
[[ -z "$file_path" || ! -f "$file_path" ]] && exit 0

case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx)
    bunx oxfmt --write -c "$OXFMT_CONFIG" "$file_path" && bunx oxlint --fix -c "$OXLINT_CONFIG" "$file_path" ;;
  *.css|*.html|*.json|*.yaml|*.yml|*.md)
    bunx oxfmt --write -c "$OXFMT_CONFIG" "$file_path" ;;
  *)
    exit 0 ;;
esac
```

Known limitations of this script (motivating the rewrite):

- Extension-to-command dispatch is hardcoded in a bash `case`, not driven by
  repo-specific config — every repo gets the exact same two rules regardless
  of its own `.nano-staged.json`.
- Config file paths (`OXLINT_CONFIG`/`OXFMT_CONFIG`) are hardcoded absolute
  paths specific to this machine/user.
- Depends on external `jq` being installed.

## Existing nano-staged setup (config format to preserve exactly)

Repos keep `nano-staged` installed as a devDependency for git pre-commit
hooks — **that stays as-is**; this new tool is an additional consumer of the
same config file, not a replacement for nano-staged itself.

`lefthook.yml` (project-a), showing how nano-staged is invoked for the git hook path:

```yaml
no_tty: true

pre-commit:
  jobs:
    - name: nano-staged
      run: ./node_modules/.bin/nano-staged --quiet

commit-msg:
  jobs:
    - name: commitlint
      run: ./node_modules/.bin/commitlint --edit {1}
```

`project-a/.nano-staged.json`:

```json
{
  "**/*.{js,jsx,ts,tsx}": ["oxlint --fix", "oxfmt"],
  "**/*.{css,html,json,yaml,yml,md}": "oxfmt",
  "**/*.svelte": ["bunx eslint --fix", "oxfmt"]
}
```

`project-b/.nano-staged.json`:

```json
{
  "**/*.{js,jsx,ts,tsx}": ["oxlint --fix", "oxfmt"],
  "**/*.{css,html,json,yaml,yml,md}": "oxfmt",
  "**/*.{svelte}": ["oxlint --fix", "oxfmt"]
}
```

Note bare commands like `oxlint --fix` and `oxfmt` (no `bunx`/`npx` prefix) —
these resolve today only because nano-staged prepends the nearest
`node_modules/.bin` to `PATH` before spawning. The new tool must replicate
that or these existing configs will break.

### How real nano-staged executes commands (verified from its source, `nano-staged@1.0.2`, in `lib/cmd-runner.js` + `lib/executor.js`)

- Each command string is shell-word tokenized (e.g. `"oxlint --fix"` →
  `["oxlint", "--fix"]`).
- Matched file paths are **appended as trailing args** to the tokenized
  command — `args.concat(files)` — and spawned directly via
  `child_process.spawn`, **never through a shell**. No `{}`/`$FILE`
  placeholder templating exists; config authors rely on "my file(s) land at
  the end of argv."
- Multiple commands under one glob pattern run **sequentially** in array
  order; if one fails, the rest of that pattern's chain is skipped (bail
  within the chain).
- Different top-level glob-pattern groups run **concurrently** relative to
  each other.
- PATH resolution prepends the nearest `node_modules/.bin` (walking up from
  cwd looking for `package.json`/`node_modules`) before spawning, so locally
  installed bins resolve by bare name.
- Glob matching is **not** a standard library — it's a hand-rolled
  character-by-character glob→regex converter (`lib/glob-to-regex.js`)
  supporting `{a,b,c}` brace groups as true regex alternation, `**` globstar
  only when flanked by `/` or string start/end (otherwise degrades to plain
  wildcard), and extglob-style `@()`/`!()`/`+()`/`?()`. This is a source of
  risk for exact compatibility if a generic Go glob library is swapped in —
  see open items below.

## Design decisions already made (v1 scope)

- **Language**: Go, compiled to a native binary. Rationale: the actual
  bottleneck is the linter/formatter subprocess (`oxlint`/`oxfmt`, themselves
  Rust binaries) — the orchestrator's runtime overhead barely matters for
  total wall-clock, but since this hook blocks Claude Code after _every_ file
  write, low fixed startup overhead is still worth having, and Go makes
  cross-compilation for the platform-binary distribution trivial.
- **Distribution**: public npm package, using the same pattern as
  `esbuild`/`oxlint`/`biome` — a thin JS/shell dispatcher published as the
  main package's `bin`, with the actual compiled binaries shipped as
  per-platform `optionalDependencies` (targets: linux-x64, linux-arm64,
  darwin-x64, darwin-arm64, windows-x64; windows-arm64 optional/low
  priority). Must work both as an installed devDependency **and** via ad-hoc
  `bunx <package>` invocation. `GoReleaser` is the intended toolchain for
  cross-compiling + wiring up the platform-package publishing.
- **Config format**: read `.nano-staged.json` verbatim, no new config shape.
  Since it's parsed from JSON (not a `.js`/`.ts` nano-staged config), the
  value per glob key can only be a string or array of strings — nano-staged's
  JS-function config variant is impossible to express in JSON, so the Go tool
  never needs to support it.
- **Config resolution**: auto-discover the nearest `.nano-staged.json` by
  walking up from the edited file's directory toward the repo root. A
  `-c`/`--config` flag is an optional explicit override, not required — the
  global Claude Code hook (one static command across every repo) must work
  without needing a per-repo hardcoded path.
- **Command execution semantics**: replicate nano-staged's exactly — shell-
  word tokenize each command string, append the single edited file path as
  the trailing arg, `spawn` directly with no shell (avoids injection, matches
  existing configs' assumptions). Multiple commands under one matched pattern
  run sequentially with bail-on-first-failure in that chain. If the file
  matches more than one pattern key, those groups run concurrently.
- **PATH resolution**: replicate nano-staged's prepending of the nearest
  `node_modules/.bin` to PATH before spawning, so today's bare `oxlint`/
  `oxfmt` commands keep working unmodified.
- **Exit codes**: propagate the underlying command's real exit code
  faithfully — no special-casing linter-vs-formatter behavior. Nonzero exit
  maps to Claude Code's exit-2 "blocking feedback" convention (stderr gets
  fed back into Claude's context) so Claude actually sees its own lint
  failures and can self-correct, rather than failing silently.
- **Hook payload handling**: parse the full PostToolUse JSON from stdin using
  Go's built-in `encoding/json` (no external `jq` dependency). Extract
  `tool_input.file_path`. Supported tool matchers: `Write`, `Edit`,
  `MultiEdit`. `Bash` calls and any payload without a resolvable file path
  silently no-op (exit 0), matching the current script's behavior — this
  also covers the "no matching glob pattern" and "no config file found"
  cases, since the hook fires globally across every repo and must degrade
  gracefully rather than error.
- **Timeouts**: per-command timeout (each command in a sequential chain gets
  its own timeout window, not one shared budget for the whole chain).
- **cwd for spawned commands**: same as nano-staged's `rootPath` behavior —
  spawn from the repo root (same directory the config file resolves from).

## Explicitly out of scope / deferred for v1

- **Exact glob-matching fidelity**: v1 uses a standard off-the-shelf Go glob
  library rather than porting nano-staged's hand-rolled `glob-to-regex.js`
  line-for-line. Revisit only if real mismatches surface against the actual
  configs in use (the brace-group / globstar-adjacency edge cases noted
  above are the likely divergence points).
- **Windows `.cmd`/`.bat` shim spawn handling**: nano-staged has special-case
  logic for Windows command-file execution (`executor.js`) that a plain Go
  `os/exec` call won't replicate automatically. Deferred — daily driver is
  Linux/WSL2.
- **Same-file concurrent-write locking**: if two near-simultaneous Claude
  edits hit the _identical_ file, two hook invocations could run
  linters/formatters on that file concurrently and race at the filesystem
  level (a different, smaller-blast-radius race than the git-index bug this
  tool exists to prevent). Explicitly decided this is **not** something the
  tool needs to handle in v1.

## Current state of this package

Only the initial scaffolding exists so far: `go.mod`/placeholder `main.go`,
the npm package manifests (main + per-platform `optionalDependencies`
packages), `.goreleaser.yaml`, and CI/`release-please` wiring. **None of the
"Design decisions already made" logic above is implemented yet** —
`main.go` and `bin/typos.js` are both stubs. Implementing that logic is the
next phase of work on this package.

## Repo conventions (see repo-root `AGENTS.md` for the full list)

- This monorepo uses `bun` workspaces (`packages/*`) with `release-please`
  for versioning/publishing — no turborepo/nx, no changesets.
- JS/TS packages extend the shared `@julianelda/lexis` oxlint/oxfmt presets;
  this package's `oxlint.config.ts`/`oxfmt.config.ts` do the same for its
  JS bits (the Go source itself isn't covered by these).
- Root `format`/`lint`/`build`/`check`/`test` scripts fan out via
  `bun run --filter='*' <script>`; packages without a matching script are
  silently skipped.
