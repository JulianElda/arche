import lexis from "./oxlint.js";

export default {
  extends: [lexis],
  overrides: [
    {
      files: ["**/*.{jsx,tsx}"],
      rules: {
        "react/forbid-dom-props": "error",
        "react/hook-use-state": "error",
        "react/iframe-missing-sandbox": "error",
        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-fragments": ["error", "syntax"],
        "react/jsx-no-comment-textnodes": "error",
        "react/jsx-no-script-url": "error",
        "react/jsx-no-target-blank": "error",
        "react/jsx-pascal-case": "error",
        "react/jsx-props-no-spreading": "error",
        "react/no-clone-element": "error",
        "react/no-multi-comp": "error",
        "react/no-react-children": "error",
        "react/no-unescaped-entities": "error",
        "react/no-unknown-property": "error",
        "react/no-unstable-nested-components": "error",
        "react/only-export-components": "error",
        "react/prefer-function-component": "error",
        "react/rules-of-hooks": "error",
        "react/self-closing-comp": "error",
        "react/style-prop-object": "error",
      },
    },
  ],
  plugins: ["react"],
};
