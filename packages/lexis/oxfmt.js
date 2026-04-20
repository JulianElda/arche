export default {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: "lf",
  ignorePatterns: ["dist"],
  insertFinalNewline: true,
  printWidth: 80,
  quoteProps: "as-needed",
  semi: true,
  singleAttributePerLine: true,
  singleQuote: false,
  sortImports: {
    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },
  sortPackageJson: {
    sortScripts: true,
  },
  sortTailwindcss: {
    attributes: ["class", "className"],
  },
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
};
