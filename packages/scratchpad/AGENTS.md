# General

- Filenames must be kebab-case.
- Files of the same feature or domain can be indicated with `.`, e.g. `my-component.ts`, `my-component.types.ts`, `my-component.api.ts`.
- Shared utilities must be domain scoped, e.g. `string.utils.ts`, `api.utils.ts`, `build.utils.ts`.
- Keep formatting and linting aligned with the shared lexis preset used by oxfmt and oxlint.
- Use `bun` for package management.
- Prefer named exports instead of default exports, e.g. `export function MyFunction()`.

# TypeScript

- Keep strict typing. Avoid any and avoid type assertions unless there is no safer option.
- Use type-only imports for TypeScript types: `import type { MyType } from '...'`.
- Prefer undefined over null.
- Prefer interface for public object shapes; use type for unions, intersections, and advanced types.
- A type file should be named `{domain|feature}.types.ts` and placed where it is relevant.
- Prefer `Record` over index signature, e.g. `type RecordType = Record<string, number>;`

# React

- Use function components and hooks.
- Use named exports for reusable components, hooks, store modules, and utilities.
- Declare component props as an interface immediately above the component.
- Name props interfaces as ComponentNameProps.
- Destructure props into a constant immediately after function declaration, e.g. `const { prop1, prop2 } = props`
- Prefer small, focused components with clear responsibility.
- Order hook declarations when independent: React built-ins → third-party hooks → generated API hooks → custom hooks. Place `useEffect` after all other hooks. If a hook depends on another hook result, prioritize dependency order over style order.
- Use named callbacks in `useEffect` (not anonymous inline functions). Use a named cleanup function when cleanup is required.
- Name event handlers descriptively with `handle` prefix: `handleClick`, `handleChange`, `handleSubmit`.
- Order attribute name alphabetically.
- Order element attributes alphabetically.
- Use `useCallback` only when a stable function reference is required (e.g. for `useEffect`, memoized components, or dependency-sensitive hooks). Avoid it otherwise.
- Return early for empty/loading states.

# Styling

- Use utility-first class composition patterns consistently.
- Reuse shared UI components before creating new variants.

# Testing

- Do not resort to mocking imports unless there is no other solution.
- Avoid abstraction in test codes. Only shared setup is acceptable.
- Prefer inlining values like strings in the test, do not extract same values to a const.
- Do not wrap tests in a file in a `describe()`.
- Use `test`, not `it`.
