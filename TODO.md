# TODO

## Try type-aware linting in each package

Type-aware oxlint rules are currently **not enforced anywhere in CI**.

`typeAware` and `typeCheck` are set only in the root `oxlint.config.ts`, but
nothing runs oxlint from the root — `bun run lint` fans out per package via
`bun run --filter='*' lint`, and each package config re-exports the lexis preset
without those options:

- `packages/domos/oxlint.config.ts`
- `packages/lexis/oxlint.config.ts`
- `packages/scratchpad/oxlint.config.ts`
- `packages/typos/oxlint.config.ts`

Confirmed with a probe file containing an `async` function and no `await`: plain
`oxlint` reports nothing, `oxlint --type-aware` reports
`typescript(require-await)`.

So these rules from `packages/lexis/oxlint.js` are silently inert in the
packages, along with the `oxlint-tsgolint` dependency that powers them:

- `typescript/prefer-nullish-coalescing`
- `typescript/require-await`
- `typescript/switch-exhaustiveness-check`

### To try

Enable `options: { typeAware: true, typeCheck: true }` per package (or push it
into the lexis preset so every consumer gets it), then run `bun run lint` and
work through whatever it surfaces. Expect new errors — these rules have never
run against this code. Also worth checking the CI time cost, since type-aware
linting spawns tsgolint and type-checks the project.
