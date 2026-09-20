# arche development tasks.
#
# This file names commands; AGENTS.md holds the reasons. Keep it that way.

set shell := ["bash", "-euo", "pipefail", "-c"]

# List the recipes.
default:
    @just --list

# oxfmt, whole repo.
format:
    bun run format

# oxfmt without writing -- what CI runs.
format-check:
    bun run format -- --check

# oxlint, then each package's own linter.
lint:
    bun run lint

# svelte-check in domos.
check:
    bun run check

# Every package, including typos' goreleaser snapshot.
build:
    bun run build

# All three suites.
test: test-domos test-scratchpad test-typos

# domos' browser-mode vitest.
test-domos *ARGS:
    bun run --filter '@julianelda/domos' test -- run {{ARGS}}

# scratchpad's browser-mode vitest.
test-scratchpad *ARGS:
    bun run --filter '@julianelda/scratchpad' test -- run {{ARGS}}

# typos' go test.
test-typos *ARGS:
    bun run --filter '@julianelda/typos' test {{ARGS}}

# Everything CI runs, in CI's order.
ci: format-check lint check build test

# domos' vite dev server.
dev-domos:
    bun run --filter '@julianelda/domos' dev

# scratchpad's vite dev server.
dev-scratchpad:
    bun run --filter '@julianelda/scratchpad' dev

# domos' storybook. Both storybooks bind 6006, so run one at a time.
storybook-domos:
    bun run --filter '@julianelda/domos' storybook

# scratchpad's storybook.
storybook-scratchpad:
    bun run --filter '@julianelda/scratchpad' storybook

# Build typos to ~/.local/bin/typos -- the binary the hooks run.
typos-install:
    bun run --filter '@julianelda/typos' build:local

# nix flake update, then re-pin playwright and bun to match it.
bump-toolchain:
    #!/usr/bin/env bash
    set -euo pipefail
    nix flake update
    system=$(nix eval --raw --impure --expr builtins.currentSystem)
    shell=".#devShells.$system.default"
    pw=$(nix eval --raw "$shell.PLAYWRIGHT_DRIVER_VERSION")
    bun_v=$(nix eval --raw "$shell.BUN_VERSION")
    bun add -d -E "playwright@$pw"
    bun add -d -E -F '@julianelda/domos' "@playwright/test@$pw"
    node -e 'const fs=require("fs"),f="package.json";fs.writeFileSync(f,fs.readFileSync(f,"utf8").replace(/("packageManager":\s*"bun@)[^"]+/,`$1${process.argv[1]}`))' "$bun_v"
    echo "pinned playwright $pw and bun $bun_v -- now run: direnv reload"
