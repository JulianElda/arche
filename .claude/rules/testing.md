---
paths:
  - "**/*.test.{ts,tsx,js,jsx}"
  - "**/*.spec.{ts,tsx,js,jsx}"
---

# Testing

- Do not resort to mocking imports unless there is no other solution.
- Avoid abstraction in test code. Only shared setup is acceptable.
- Prefer inlining values like strings in the test; do not extract the same value to a const.
- Do not wrap the tests in a file in a `describe()`.
- Use `test`, not `it`.
