import { prettierConfig } from "./prettier.js";

export default {
  ...prettierConfig,

  ignorePatterns: ["dist"],
  insertFinalNewline: true,
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
};
