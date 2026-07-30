---
paths:
  - "**/*.api.ts"
  - "**/*.slice.ts"
  - "**/store.ts"
---

# RTK Query

- The interface of a request should be named `*Request`, and the response `*Response`.
- Redux stores UI state only; server data must come from RTK Query unless explicitly cached for offline/optimistic use.
- Prefer `skipToken` instead of the `skip` attribute.
