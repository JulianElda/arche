import svelte from "eslint-plugin-svelte";

import lexis from "./oxlint.js";

// `svelte.configs.recommended` is a flat-config array. Its file-scoped blocks
// only carry parser/processor wiring plus ESLint core rules that oxlint doesn't
// enable anyway, so take the rules from the unscoped blocks only — hoisting the
// scoped ones would disable core rules repo-wide.
const recommended = Object.assign(
  {},
  ...svelte.configs.recommended
    .filter((config) => !config.files)
    .map((config) => config.rules ?? {}),
);

// Guard against upstream restructuring the array: silently linting Svelte files
// with zero Svelte rules is worse than failing to load.
if (Object.keys(recommended).length === 0) {
  throw new Error(
    "@julianelda/lexis: eslint-plugin-svelte's recommended config yielded no rules",
  );
}

export default {
  extends: [lexis],
  jsPlugins: ["eslint-plugin-svelte"],
  overrides: [
    {
      files: ["*.svelte", "**/*.svelte"],
      jsPlugins: ["eslint-plugin-svelte"],
      rules: {
        // Self-assignment is a valid way to trigger Svelte reactivity.
        "no-self-assign": "off",
      },
    },
  ],
  rules: recommended,
};
