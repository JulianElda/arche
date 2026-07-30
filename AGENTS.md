# General

- Filenames must be kebab-case.
- Files of the same feature or domain can be indicated with `.`, e.g. `my-component.ts`, `my-component.types.ts`, `my-component.api.ts`.
- Shared utilities must be domain scoped, e.g. `string.utils.ts`, `api.utils.ts`, `build.utils.ts`.
- Use `bun` for package management.
- Prefer named exports instead of default exports, e.g. `export function MyFunction()`.

Language- and framework-specific conventions live in `.claude/rules/`, scoped by
file extension so they load only when a matching file is in context.
