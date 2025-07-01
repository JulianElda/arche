import tsParser from "@typescript-eslint/parser";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = [
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      ...betterTailwindcss.configs["recommended-warn"].rules,
    },
  },
];

export default eslintConfig;
