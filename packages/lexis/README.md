# lexis

> Reprove not a scorner, lest he hate thee: rebuke a wise man, and he will love thee.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@julianelda/lexis)](https://www.npmjs.com/package/@julianelda/lexis)

My oxc rules.

# oxlint Usage

```ts
import lexis from "@julianelda/lexis/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...lexis,
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
```

# oxlint React Usage

```ts
import lexis from "@julianelda/lexis/oxlint/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...lexis,
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
```

# oxlint Svelte Usage

```ts
import lexis from "@julianelda/lexis/oxlint/svelte";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...lexis,
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
```

# oxfmt Usage

```ts
import lexis from "@julianelda/lexis/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...lexis,
  sortTailwindcss: {
    attributes: ["className"],
  },
});
```
