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

## React + Tailwind

```ts
import lexis from "@julianelda/lexis";
import tailwind from "@julianelda/lexis/tsx-tailwind";
import tsParser from "@typescript-eslint/parser";

const config = [
  ...lexis,
  ...tailwind,
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: tsParser,
    },
  },
  settings: {
    "better-tailwindcss": {
      entryPoint: "src/tailwind.css",
      tsconfig: "tsconfig.json",
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
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
```

# oxlint Usage

```json
{
  "extends": ["./node_modules/@julianelda/lexis/.oxlintrc.json"]
}
```
