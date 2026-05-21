import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    perf: "error",
  },
  env: {
    browser: true,
    builtin: true,
    node: true,
  },
  ignorePatterns: [
    "**/node_modules",
    "**/.output",
    "**/.vercel",
    "**/.netlify",
    "**/.wrangler",
    ".svelte-kit",
    "build",
    "**/.DS_Store",
    "**/Thumbs.db",
    "**/.env",
    "**/.env.*",
    "!**/.env.example",
    "!**/.env.test",
    "**/vite.config.js.timestamp-*",
    "**/vite.config.ts.timestamp-*",
  ],
  jsPlugins: ["eslint-plugin-svelte", "eslint-plugin-perfectionist"],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  overrides: [
    {
      files: ["*.svelte", "**/*.svelte"],
      jsPlugins: ["eslint-plugin-svelte"],
      rules: {
        "no-inner-declarations": "off",
        "no-self-assign": "off",
      },
    },
  ],
  plugins: ["typescript", "unicorn", "oxc"],
  rules: {
    "perfectionist/sort-array-includes": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-classes": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-decorators": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-enums": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-export-attributes": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-exports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-heritage-clauses": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-import-attributes": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-imports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-interfaces": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-intersection-types": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-jsx-props": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-maps": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-modules": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-named-exports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-named-imports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-object-types": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-sets": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-switch-case": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-union-types": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-variable-declarations": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "svelte/comment-directive": "error",
    "svelte/infinite-reactive-loop": "error",
    "svelte/no-at-debug-tags": "warn",
    "svelte/no-at-html-tags": "error",
    "svelte/no-dom-manipulating": "error",
    "svelte/no-dupe-else-if-blocks": "error",
    "svelte/no-dupe-on-directives": "error",
    "svelte/no-dupe-style-properties": "error",
    "svelte/no-dupe-use-directives": "error",
    "svelte/no-export-load-in-svelte-module-in-kit-pages": "error",
    "svelte/no-immutable-reactive-statements": "error",
    "svelte/no-inner-declarations": "error",
    "svelte/no-inspect": "warn",
    "svelte/no-navigation-without-resolve": "error",
    "svelte/no-not-function-handler": "error",
    "svelte/no-object-in-text-mustaches": "error",
    "svelte/no-raw-special-elements": "error",
    "svelte/no-reactive-functions": "error",
    "svelte/no-reactive-literals": "error",
    "svelte/no-reactive-reassign": "error",
    "svelte/no-shorthand-style-property-overrides": "error",
    "svelte/no-store-async": "error",
    "svelte/no-svelte-internal": "error",
    "svelte/no-unknown-style-directive-property": "error",
    "svelte/no-unnecessary-state-wrap": "error",
    "svelte/no-unused-props": "error",
    "svelte/no-unused-svelte-ignore": "error",
    "svelte/no-useless-children-snippet": "error",
    "svelte/no-useless-mustaches": "error",
    "svelte/prefer-svelte-reactivity": "error",
    "svelte/prefer-writable-derived": "error",
    "svelte/require-each-key": "error",
    "svelte/require-event-dispatcher-types": "error",
    "svelte/require-store-reactive-access": "error",
    "svelte/system": "error",
    "svelte/valid-each-key": "error",
    "svelte/valid-prop-names-in-kit-pages": "error",
    "unicorn/no-array-for-each": "error",
    "unicorn/no-array-reverse": "error",
    "unicorn/no-array-sort": "error",
    "unicorn/no-immediate-mutation": "error",
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-instanceof-builtins": "error",
    "unicorn/no-negation-in-equality-check": "error",
    "unicorn/no-null": "error",
    "unicorn/numeric-separators-style": "error",
    "unicorn/prefer-global-this": "error",
    "unicorn/prefer-node-protocol": "error",
    "unicorn/prefer-number-properties": "error",
  },
});
