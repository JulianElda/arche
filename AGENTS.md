# General

- Filenames must be kebab-case.
- Files of the same feature or domain can be indicated with `.`, e.g. `my-component.ts`, `my-component.types.ts`, `my-component.api.ts`.
- Shared utilities must be domain scoped, e.g. `string.utils.ts`, `api.utils.ts`, `build.utils.ts`.
- Use `bun` for package management.
- Prefer named exports instead of default exports, e.g. `export function MyFunction()`.

Language- and framework-specific conventions live in `.claude/rules/`, scoped by
file extension so they load only when a matching file is in context.

# Commands

The dev shell is the supported way to run these. It pins `bun`, `node`, `go`,
`golangci-lint` and `goreleaser`, and points Playwright at browsers from the same
nixpkgs lock. `direnv allow` once, and every shell in the repo has them; without
it, `nix develop` per command. Outside the shell the checks run against whatever
the host happens to install, and the browser suites are the first to break.

- `bun run format -- --check` — oxfmt, whole repo
- `bun run lint` — oxlint, then each package's own (`eslint` in domos,
  `golangci-lint run` in typos)
- `bun run check` — svelte-check in domos
- `bun run build` — every package, including typos' goreleaser snapshot
- `bun run --filter '@julianelda/domos' test -- run` — browser-mode vitest.
  `run` is needed because the script is bare `vitest`, which otherwise watches
- `bun run --filter '@julianelda/scratchpad' test -- run` — same
- `bun run --filter '@julianelda/typos' test` — `go test ./...`

## Bumping the toolchain

nixpkgs leads and npm follows, never the reverse: on NixOS a Playwright-downloaded
Chrome cannot resolve `libglib-2.0.so.0`, so the browsers have to come from
nixpkgs, and the npm `playwright` version is a mirror of
`pkgs.playwright-driver.version`. A Playwright release newer than the locked
driver is not reachable by bumping npm alone.

```sh
nix flake update
direnv reload    # the shellHook names any version that no longer matches
bun add -d -E playwright@$PLAYWRIGHT_DRIVER_VERSION
bun add -d -E -F '@julianelda/domos' @playwright/test@$PLAYWRIGHT_DRIVER_VERSION
# set "packageManager" to the bun version the hook reports, then:
direnv reload    # silent
```

`-E` is not optional: `bun add` writes a caret range by default, which would undo
the exact pin and let `bun update` walk away from the flake on its own.

CI needs no step here. It runs `setup-bun`, which reads `packageManager`, and
`playwright install chromium`, which fetches whatever build the npm version asks
for — so it follows `package.json` and `bun.lock`.
