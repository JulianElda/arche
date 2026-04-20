export const prettierConfig = {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 80,
  quoteProps: "as-needed",
  semi: true,
  singleAttributePerLine: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};

export default {
  ...prettierConfig,
  plugins: ["@prettier/plugin-oxc"],
};
