---
paths:
  - "**/*.svelte"
---

# Svelte

- Prefer runes. Declare component props with `$props()` and an interface immediately above the component script, named `ComponentNameProps` (e.g. `HeaderProps`, `ButtonProps`).
- Destructure props with `const { prop1, prop2 } = $props()` immediately after the script tag.
- Use `$effect()` for reactive side effects; avoid reactive blocks (`$:`) for clarity.
- Use `let` for component state; prefer `let` over module-level variables to scope state.
- Name event handlers descriptively with a `handle` prefix: `handleClick`, `handleChange`, `handleSubmit`.
- Order element attributes alphabetically.
- Keep components small and focused with a single responsibility; extract logic into separate components or utility functions. Reuse shared UI components before creating new variants.
- Return or conditional-render early for empty, loading, or error states using `{#if}` blocks.
