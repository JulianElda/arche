#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

// Keys are `${process.platform}-${process.arch}`; values are the matching
// optionalDependency published alongside this package.
const PLATFORM_PACKAGES = {
  "darwin-arm64": "@julianelda/typos-darwin-arm64",
  "darwin-x64": "@julianelda/typos-darwin-x64",
  "linux-arm64": "@julianelda/typos-linux-arm64",
  "linux-x64": "@julianelda/typos-linux-x64",
  "win32-x64": "@julianelda/typos-win32-x64",
};

const platformKey = `${process.platform}-${process.arch}`;
const packageName = PLATFORM_PACKAGES[platformKey];

if (!packageName) {
  console.error(
    `typos: unsupported platform "${platformKey}" — no @julianelda/typos-* binary is published for it`,
  );
  process.exit(1);
}

const binaryName = process.platform === "win32" ? "typos.exe" : "typos";

let binaryPath;
try {
  binaryPath = path.join(
    path.dirname(require.resolve(`${packageName}/package.json`)),
    binaryName,
  );
} catch {
  console.error(
    `typos: could not find "${packageName}" — it should have installed automatically as an optionalDependency. Try removing node_modules and reinstalling.`,
  );
  process.exit(1);
}

const result = spawnSync(binaryPath, process.argv.slice(2), {
  stdio: "inherit",
});

if (result.error) {
  console.error(
    `typos: failed to run "${binaryPath}": ${result.error.message}`,
  );
  process.exit(1);
}

process.exit(result.status ?? (result.signal ? 1 : 0));
