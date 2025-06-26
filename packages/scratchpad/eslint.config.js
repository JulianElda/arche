import lexis from "@julianelda/lexis/react";
import storybook from "eslint-plugin-storybook";

export default [...lexis, ...storybook.configs["flat/recommended"]];
