---
paths:
  - "**/*.{ts,tsx,mts,cts}"
  - "**/*.svelte"
---

# TypeScript

- Keep strict typing. Avoid type assertions unless there is no safer option.
- Prefer `undefined` over `null`, except when it is required by external libraries.
- Prefer `interface` for public object shapes; use `type` for unions, intersections, and advanced types.
- A type file should be named `{domain|feature}.types.ts` and placed where it is relevant.
- Prefer `Record` over an index signature, e.g. `type RecordType = Record<string, number>;`
