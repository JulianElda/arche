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
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "typos" }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit|Bash",
        "hooks": [{ "type": "command", "command": "typos" }]
      }
    ],
    "PostToolUseFailure": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "typos" }]
      }
    ],
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "typos" }] }],
    "Stop": [{ "hooks": [{ "type": "command", "command": "typos" }] }],
    "SessionEnd": [{ "hooks": [{ "type": "command", "command": "typos" }] }]
  }
}
```

Claude Code pipes the tool call's JSON payload to the command's stdin.
For `Write`/`Edit`/`MultiEdit`, `typos` reads `tool_input.file_path`,
finds the nearest `.nano-staged.json` by walking up from that file's
directory, and runs whichever configured commands match it.

`Bash` calls (`sed -i`, `cat > file`, ...) name no file, so `typos` works
it out: the `PreToolUse` hook records when the call started, and the
`PostToolUse` hook asks git (read-only, `git --no-optional-locks status`)
which files are dirty and were modified since, then lints those — each
pattern's matching files batched into one command spawn. Files already
dirty before the call are left alone, and a call that changed more than
20 files is skipped. `PostToolUseFailure` covers commands that edited
files and then exited nonzero. Outside a git work tree, `Bash` calls are
a no-op.

When Claude is about to end its turn, the `Stop` hook sweeps every file
changed during the session (since the `SessionStart` hook ran) — a safety
net for anything the per-edit hooks missed, like a `Bash` call over the
20-file cap. Failures exit 2, which keeps Claude working with the errors
in front of it; if it's already continuing because of a Stop hook, `typos`
lets it stop rather than loop. After a clean sweep, the next one only
looks at files changed since. `SessionEnd` cleans up the session's marker.

No matching glob pattern or no config found at all is a silent no-op
(exit 0).

Every hook invocation pays the command's startup cost, so for the
lowest overhead point `command` at the native binary rather than
`bunx typos` — e.g. build it straight onto your `PATH` with
`bun run --filter=@julianelda/typos build:local` (`~/.local/bin/typos`) and
wire the hooks once in `~/.claude/settings.json` for every repo.

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

`typos doctor` reports what `typos` resolves from the current directory, and
is the only way to see it — the hooks no-op silently rather than fail when
something is missing:

```sh
$ typos doctor
git:      /run/current-system/sw/bin/git (PATH)
markers:  /home/you/.cache/typos
worktree: /home/you/work/my-repo
config:   /home/you/work/my-repo/.nano-staged.json
```

git is looked for in fixed system locations first, then on `PATH`, skipping
any entry that's relative, has a `node_modules` segment or sits inside the
work tree being inspected — so a directory the repo itself controls can't
supply it. Without git, `Bash` and `Stop` do nothing (`Write`/`Edit`/
`MultiEdit` are unaffected), and `doctor` exits 1 to say so; every other line
is informational and exits 0.

A failing command's exit code and stderr are surfaced as Claude Code's
"blocking feedback" (exit code 2), so Claude sees the actual lint/format
error and can self-correct.

See `CLAUDE.md` for the full design and current implementation status.
