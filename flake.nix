{
  description = "arche development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = f:
        nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            bun # packages/*, the monorepo runner
            nodejs # node_modules/.bin/{lefthook,nano-staged,commitlint,oxlint,oxfmt,vitest} are #!/usr/bin/env node
            go # packages/typos
            golangci-lint # v2 config in packages/typos/.golangci.yml, run by its `lint` script
            goreleaser # packages/typos build + build:all
            just # the justfile at the repo root, this repo's entry point
          ];

          # Playwright cannot use its own downloaded browsers here: the Chrome it
          # fetches dies on `libglib-2.0.so.0: cannot open shared object file`.
          # So the browsers come from this pin, which shadows the system-wide
          # PLAYWRIGHT_BROWSERS_PATH from ~/.config/nixos for this repo.
          PLAYWRIGHT_BROWSERS_PATH = pkgs.playwright-driver.browsers;
          PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";

          # The browsers' store path carries no version, so this is the only
          # readable handle on the locked driver. The bump commands in AGENTS.md
          # take it directly.
          PLAYWRIGHT_DRIVER_VERSION = pkgs.playwright-driver.version;

          # Same reasoning one step over: `bun --version` is the shell's bun, not
          # the locked one, so this is the readable handle `just bump-toolchain`
          # rewrites `packageManager` from.
          BUN_VERSION = pkgs.bun.version;

          # Those browsers only satisfy the npm playwright of the same version,
          # and `nix flake update` moves bun as well, so both pins are checked on
          # entry. Warning only: a shell you cannot enter is the worse failure,
          # and neither mismatch breaks every command. direnv loads .envrc from
          # the repo root, which is what the relative paths resolve against; a
          # bare `nix develop` from a package directory skips both checks.
          shellHook = ''
            pinned_pw=${pkgs.playwright-driver.version}
            manifest=node_modules/playwright/package.json
            if [ -f "$manifest" ]; then
              installed=$(grep -m1 '"version"' "$manifest" | cut -d'"' -f4)
              if [ "$installed" != "$pinned_pw" ]; then
                echo "arche: playwright $installed does not match the pinned browsers ($pinned_pw)" >&2
                echo "       run: bun add -d -E playwright@$pinned_pw" >&2
                echo "            bun add -d -E -F '@julianelda/domos' @playwright/test@$pinned_pw" >&2
              fi
            fi

            pinned_bun=${pkgs.bun.version}
            declared=$(grep -m1 '"packageManager"' package.json | cut -d'"' -f4 | cut -d@ -f2)
            if [ -n "$declared" ] && [ "$declared" != "$pinned_bun" ]; then
              echo "arche: packageManager says bun@$declared but this shell provides $pinned_bun" >&2
              echo "       CI's setup-bun reads that field — set it to $pinned_bun" >&2
            fi
          '';
        };
      });
    };
}
