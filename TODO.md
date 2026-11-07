# TODO

## Release workflow follow-ups

- Release PRs merge without CI. The `GITHUB_TOKEN` that release-please opens
  them with does not trigger workflows normally: #90's CI run 42373358861 sat at
  `action_required` and the PR was merged untested. Give release-please a
  GitHub App token (or a PAT) so its PRs run CI like any other.
- Release PRs bump `package.json` without touching `bun.lock`. That broke
  `master`'s frozen-lockfile CI after #71 and after #83, but not after #90:
  `4437734` has domos 4.0.0 in `package.json` and 3.0.1 in `bun.lock`, and
  `bun install --frozen-lockfile` (bun 1.4.2) passes. Possibly it only fails
  when a bump changes how a workspace range resolves, as stilo 2.0.0 did under
  domos' `^1.0.2` in #83. Unverified: confirm on the next release that fails
  before refreshing `bun.lock` on the release branch or relaxing CI.
- `actions/checkout@v4` and `actions/setup-node@v4` target Node 20, which
  runners now force onto Node 24 with a deprecation warning. Move both
  workflows to the current majors, re-pinned by SHA.
- `typos*-v1.2.0` have tags (pushed by hand at 64eb6d2) but no GitHub release
  pages. Creating them needs a token with the `workflow` scope. The notes are
  each package's 1.2.0 CHANGELOG section.
- `@julianelda/chroma` has no npm trusted publisher (it was last published by
  hand), so its next release will fail the way stilo 2.0.0 did. Add one on
  npmjs.com: owner `JulianElda`, repo `arche`, workflow `release-please.yml`,
  no environment.

## Heliotrope font files are still public

stilo is gone from this repo (#89), and no published domos from 3.0.1 on
depends on it. The MB Type-licensed Heliotrope woff2 files remain in:

- `@julianelda/stilo` 1.0.0, 1.0.1 and 1.0.2 on npm. With domos' latest no
  longer depending on stilo, the npm UI offers to delete the package. Delete it
  once hestia is ported (stilo out of its `bun.lock`, Vercel builds passing),
  since hestia's installs 404 from then on. Then deprecate what can no longer
  install: `npm deprecate '@julianelda/domos@<3.0.1' "Depends on the removed
@julianelda/stilo. Use @julianelda/domos 3.0.1 or later."` If npm refuses the
  delete, deprecate stilo instead and ask npm Support to remove 1.0.x.
- this public repo's history, under `packages/stilo/fonts/`, since `18111f4`.
  Removing them needs `git filter-repo` plus a force-push, and GitHub Support
  to purge cached views.

The fonts now live only in the private `@julianelda-private/heliotrope`
package (repo `julianelda-private/heliotrope`).

domos 3.0.1 on npm was built from `1d58a80` (#89), not from its tag (#87), so
it already drops stilo while its CHANGELOG says it requires stilo 2. Left as
is: 4.0.0 is the same code, released under the right version.
