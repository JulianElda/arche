import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import basicConfig from "./eslint.config.mjs";

export default [
  ...basicConfig,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.strict,
];
