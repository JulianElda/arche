# lexis

> My oxc and prettier rules

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@julianelda/lexis)](https://www.npmjs.com/package/@julianelda/lexis)

# oxlint Usage

```ts
import lexis from "@julianelda/lexis/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...lexis,
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

# Prettier Usage

```js
import prettier from "@julianelda/lexis/prettier";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettier,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
```
