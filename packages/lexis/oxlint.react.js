import lexis from "./oxlint.js";

export default {
  ...lexis,
  overrides: [
    ...(lexis.overrides ?? []),
    {
      files: ["**/*.{jsx,tsx}"],
      rules: {
        "react-perf/jsx-no-jsx-as-prop": "error",
        "react-perf/jsx-no-new-array-as-prop": "error",
        "react-perf/jsx-no-new-function-as-prop": "error",
        "react-perf/jsx-no-new-object-as-prop": "error",
        "react/exhaustive-deps": "error",
        "react/forward-ref-uses-ref": "error",
        "react/jsx-key": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        "react/jsx-props-no-spread-multi": "error",
        "react/no-children-prop": "error",
        "react/no-danger-with-children": "error",
        "react/no-find-dom-node": "error",
        "react/no-render-return-value": "error",
        "react/no-this-in-sfc": "error",
        "react/no-unsafe": "error",
        "react/void-dom-elements-no-children": "error",
      },
    },
  ],
  plugins: [...new Set([...(lexis.plugins ?? []), "react", "react-perf"])],
};
