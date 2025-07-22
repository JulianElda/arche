import lexis from "@julianelda/lexis/react";
import tailwind from "@julianelda/lexis/tsx-tailwind";
import tsParser from "@typescript-eslint/parser";
import storybook from "eslint-plugin-storybook";

export default [
  ...lexis,
  ...tailwind,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "lib/tailwind.css",
        tsconfig: "tsconfig.lib.json",
      },
    },
  },
];
