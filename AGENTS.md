# General

- Filenames must be kebab-case.
- Files of the same feature or domain can be indicated with `.`, e.g. `my-component.ts`, `my-component.types.ts`, `my-component.api.ts`.
- Shared utilities must be domain scoped, e.g. `string.utils.ts`, `api.utils.ts`, `build.utils.ts`.
- Use `bun` for package management.
- Prefer named exports instead of default exports, e.g. `export function MyFunction()`.

Language- and framework-specific conventions live in `.claude/rules/`, scoped by
file extension so they load only when a matching file is in context.

# Commands

`just` from the repo root, and `just` alone lists every recipe. The recipes wrap
the `package.json` scripts rather than replacing them: CI installs bun with
`setup-bun`, release-please's publish job runs in an isolated checkout, and
`lefthook.yml` calls `./node_modules/.bin/*` directly — none of the three can
reach `just`, so the scripts stay the contract.

The dev shell is the supported way to run these. It pins `bun`, `node`, `go`,
`golangci-lint`, `goreleaser` and `just`, and points Playwright at browsers from
the same nixpkgs lock. `direnv allow` once, and every shell in the repo has them;
without it, `nix develop` per command. Outside the shell the checks run against
whatever the host happens to install, and the browser suites are the first to
break.

- `just ci` — everything `.github/workflows/ci.yml` runs, in its order:
  `format-check`, `lint`, `check`, `build`, then the three suites. It skips the
  workflow's `bunx svelte-kit sync`, which is there only because CI installs with
  `--ignore-scripts`
- `just check` — svelte-check in domos, the same narrow thing the `check` script
  means. The whole gate is `just ci`
- `just test` — all three suites. `just test-domos`, `just test-scratchpad` and
  `just test-typos` run one, and each takes that suite's own flags
  (`just test-domos --coverage`, `just test-typos -run TestRun`), which is why
  they are three recipes and not one parameterised by package
- `just dev-domos`, `just dev-scratchpad` — vite dev servers.
  `just storybook-domos`, `just storybook-scratchpad` — storybooks; both bind
  6006, so run one at a time
- `just typos-install` — rebuilds `~/.local/bin/typos`, the binary the hooks in
  `.claude/settings.json` actually run
- `just sisyphos-install` — symlinks each skill in `packages/sisyphos/skills`
  into `~/.claude/skills`, so it loads in every repo

## Bumping the toolchain

nixpkgs leads and npm follows, never the reverse: on NixOS a Playwright-downloaded
Chrome cannot resolve `libglib-2.0.so.0`, so the browsers have to come from
nixpkgs, and the npm `playwright` version is a mirror of
`pkgs.playwright-driver.version`. A Playwright release newer than the locked
driver is not reachable by bumping npm alone.

```sh
just bump-toolchain
direnv reload    # silent
```

The recipe runs `nix flake update`, then re-pins both playwright packages and
`packageManager` from the updated flake. It reads the versions with `nix eval` on
`PLAYWRIGHT_DRIVER_VERSION` and `BUN_VERSION` rather than from the environment,
because a recipe is a subprocess: a `direnv reload` inside it cannot update the
shell that invoked it, so the environment it can see is the stale one. The
`direnv reload` above is yours to run afterwards, and it should be silent — the
shellHook names any version that still does not match.

It passes `-E` to both `bun add` calls, and that is not optional: `bun add` writes
a caret range by default, which would undo the exact pin and let `bun update` walk
away from the flake on its own.

CI needs no step here. It runs `setup-bun`, which reads `packageManager`, and
`playwright install chromium`, which fetches whatever build the npm version asks
for — so it follows `package.json` and `bun.lock`.
