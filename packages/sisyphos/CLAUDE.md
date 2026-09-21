# sisyphos

A collection of agent skills. `just sisyphos-install` symlinks each skill into
`~/.claude/skills`.

## Layout

Each skill is a directory under `skills/`, named in kebab-case, holding a
`SKILL.md` and any files it references:

```text
skills/
  my-skill/
    SKILL.md
    reference.md
    scripts/
```

`SKILL.md` opens with frontmatter. `name` must match the directory name, and
`description` is what the agent reads to decide when to load the skill, so it
says both what the skill does and when to use it:

```md
---
name: my-skill
description: Does X. Use when the user asks for Y or mentions Z.
---

# My Skill

Instructions...
```
