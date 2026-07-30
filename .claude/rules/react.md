---
paths:
  - "**/*.{jsx,tsx}"
---

# React

- Use function components and hooks.
- Declare component props as an interface immediately above the component, named `ComponentNameProps`.
- Destructure props into a constant immediately after the function declaration, e.g. `const { prop1, prop2 } = props`.
- Prefer small, focused components with clear responsibility. Reuse shared UI components before creating new variants.
- Order hook declarations when independent: React built-ins → third-party hooks → generated API hooks → custom hooks. Place `useEffect` after all other hooks. If a hook depends on another hook result, prioritize dependency order over style order.
- Use named callbacks in `useEffect` (not anonymous inline functions). Use a named cleanup function when cleanup is required.
- Name event handlers descriptively with a `handle` prefix: `handleClick`, `handleChange`, `handleSubmit`.
- Use `useCallback` only when a stable function reference is required (e.g. for `useEffect`, memoized components, or dependency-sensitive hooks). Avoid it otherwise.
- Return early for empty/loading states.
