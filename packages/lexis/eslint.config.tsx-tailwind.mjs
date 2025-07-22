import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = [
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
