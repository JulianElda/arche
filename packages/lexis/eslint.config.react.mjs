import eslintReact from "@eslint-react/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import basicConfig from "./eslint.config.mjs";

export default [
  ...basicConfig,
  eslintReact.configs["all"],
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.strict,

  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ["*.{jsx,tsx}"],
    rules: {
      "unicorn/no-null": "off",
    },
  },

  { rules: { "@eslint-react/naming-convention/filename": "off" } },
];
