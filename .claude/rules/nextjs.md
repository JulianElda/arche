---
paths:
  - "**/page.{ts,tsx,js,jsx}"
  - "**/layout.{ts,tsx,js,jsx}"
  - "**/route.{ts,js}"
  - "**/{template,error,loading,not-found,default}.{ts,tsx,js,jsx}"
  - "**/middleware.{ts,js}"
---

# Next.js

- Use default exports only for route-level files (page, layout, and route handlers). This overrides the named-export preference in the general conventions.
- Keep server/client boundaries explicit in app routes and providers.
- Use path aliases consistently: `src/*` for source modules, `@/*` for app/root modules.
