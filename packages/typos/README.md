# typos

> In all things shewing thyself a pattern of good works.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@julianelda/typos)](https://www.npmjs.com/package/@julianelda/typos)

Lint/format a single edited file — safe for Claude Code hooks, no git involved.

Reads a repo's existing `.nano-staged.json` and runs the matching
lint/format commands against a single file path, replicating
[nano-staged](https://github.com/usmanyunusov/nano-staged)'s command
execution semantics without any git staging — safe to call concurrently
from a Claude Code `PostToolUse` hook.

## Usage

Wired up as a Claude Code hook, in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "typos"
          }
        ]
      }
    ]
  }
}
```

Claude Code pipes the tool call's JSON payload to the command's stdin;
`typos` reads `tool_input.file_path` from it, finds the nearest
`.nano-staged.json` by walking up from that file's directory, and runs
whichever configured commands match it. Anything else — a `Bash` call, no
matching glob pattern, no config found at all — is a silent no-op (exit 0).

Called directly, e.g. to try a config against one file:

```sh
echo '{"tool_name":"Write","tool_input":{"file_path":"src/index.ts"}}' \
  | typos
```

`-c`/`--config` overrides auto-discovery with an explicit config path:

```sh
echo '{"tool_name":"Write","tool_input":{"file_path":"src/index.ts"}}' \
  | typos --config ./.nano-staged.json
```

A failing command's exit code and stderr are surfaced as Claude Code's
"blocking feedback" (exit code 2), so Claude sees the actual lint/format
error and can self-correct.

See `CLAUDE.md` for the full design and current implementation status.
