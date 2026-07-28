# typos

> Lint/format a single edited file — safe for Claude Code hooks, no git involved

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@julianelda/typos)](https://www.npmjs.com/package/@julianelda/typos)

Reads a repo's existing `.nano-staged.json` and runs the matching
lint/format commands against a single file path, replicating
[nano-staged](https://github.com/usmanyunusov/nano-staged)'s command
execution semantics without any git staging — safe to call concurrently
from a Claude Code `PostToolUse` hook.

This package is under active initial development; see `CLAUDE.md` for the
full design brief.
