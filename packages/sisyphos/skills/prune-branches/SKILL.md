---
name: prune-branches
description: Deletes local git branches already merged into the default branch, squash merges included. Merged branches go without asking; squash-merged ones are shown with evidence and deleted only on approval.
disable-model-invocation: true
---

# /prune-branches

Delete local branches whose work is already in the default branch. Local only:
never delete, push to or otherwise change a remote branch.

## 1. Find the default branch

```sh
git symbolic-ref --short refs/remotes/origin/HEAD
```

Strip the `origin/` prefix; the rest is `<default>`. Never assume `master` or
`main`. If the ref is unset, say so, suggest `git remote set-head origin -a`, and
stop.

## 2. Fetch

```sh
git fetch --prune
```

This updates `<default>`'s remote copy and marks upstreams deleted on the remote
as `gone`. If the local `<default>` is behind `origin/<default>`, compare against
`origin/<default>` in the steps below, so a merge that has not been pulled yet
still counts.

## 3. Delete the merged branches

```sh
git branch --merged <default>
```

Drop from the list:

- `<default>` itself;
- the current branch, marked `*`;
- any branch checked out in another worktree, marked `+`.

Run `git branch -d` on the rest straight away, without asking. `-d` refuses
anything not fully merged, so it cannot lose work. Before deleting, record each
branch's short SHA (`git rev-parse --short <branch>`) and report it, so any of
them can be recreated with `git branch <name> <sha>`.

## 4. Find the squash-merged branches

A squash merge writes a new commit, so the branch's commits never become
ancestors of `<default>` and `--merged` misses them. For each remaining local
branch, with the same exclusions as step 3, it is a candidate when either test
holds:

- `git cherry <default> <branch>` prints no `+` lines. Every commit has an
  equivalent patch in `<default>`. This is the reliable test, but it misses a
  multi-commit branch squashed into one commit, where every line prints `+`.
- `git merge-tree --write-tree <default> <branch>` exits 0 and prints the same
  tree as `git rev-parse <default>^{tree}`: merging the branch would change
  nothing. This catches the multi-commit case, but fails whenever later commits
  on `<default>` touched nearby lines, so it is a fallback and never enough on
  its own to delete.

A branch that neither test marks is kept.

## 5. Ask about each candidate

For each candidate show:

- the `git cherry` output;
- the branch's own change, from the merge-base, not from `<default>`:
  `git diff --stat $(git merge-base <default> <branch>) <branch>`. A plain
  `git diff <default> <branch>` also shows `<default>`'s later work, reversed;
- whether `git branch -vv` marks its upstream `gone`, which means the remote
  branch was deleted, usually by the merge.

Then ask which to delete, in one question for all candidates. Run
`git branch -D` only on the ones the user approves, reporting each short SHA as
in step 3.

## 6. Report

List what was deleted, each with its short SHA, and what was kept, each with the
reason: current branch, checked out in another worktree, not merged, or a
squash candidate the user declined.
