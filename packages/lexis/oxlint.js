export default {
  categories: {
    perf: "error",
  },
  env: {
    builtin: true,
    es2026: true,
  },
  ignorePatterns: ["dist"],
  jsPlugins: ["eslint-plugin-perfectionist"],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["typescript", "unicorn", "oxc", "react", "jsx-a11y"],
  rules: {
    curly: ["error", "all"],
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
    "typescript/consistent-type-imports": "error",
    "typescript/no-explicit-any": "error",
    "typescript/prefer-for-of": "error",
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
};
