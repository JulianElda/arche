# lexis

> My eslint rules

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@julianelda/lexis)](https://www.npmjs.com/package/@julianelda/lexis)

# Eslint Usage

## Typescript

```ts
import lexis from "@julianelda/lexis";

const config = [
  ...lexis,
  {
    ...
  }
]

export default config
```

## React

```ts
import lexis from "@julianelda/lexis/react";

const config = [
  ...lexis,
  {
    ...
  }
]

export default config
```

## Next.js

```ts
import lexis from "@julianelda/lexis/react";
import next from "@next/eslint-plugin-next";

const config = [
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  ...lexis,
  {
    ...
  },
];

export default config;

```

## React + Tailwind

```ts
import lexis from "@julianelda/lexis/react";
import tailwind from "@julianelda/lexis/tsx-tailwind";

const config = [

  ...lexis,
  ...tailwind,
  settings: {
    "better-tailwindcss": {
      entryPoint: "src/tailwind.css"
    }
  },
  {
    ...
  }
];

export default config;

```

# Prettier Usage

```js
import prettier from "@julianelda/lexis/prettier";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettier,
  ...
};

export default config;
```
