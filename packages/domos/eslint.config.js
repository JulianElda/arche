import js from "@eslint/js";
import oxlint from "eslint-plugin-oxlint";
import svelte from "eslint-plugin-svelte";
import { includeIgnoreFile } from "eslint/config";
import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import ts from "typescript-eslint";

import svelteConfig from "./svelte.config.js";
const gitignorePath = path.resolve(import.meta.dirname, "../../.gitignore");

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ts.configs.recommended,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        projectService: false,
        svelteConfig,
      },
    },
  },
  ...oxlint.configs["flat/recommended"],
);
