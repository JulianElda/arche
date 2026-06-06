import lexis from "@julianelda/lexis/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...lexis,
  sortTailwindcss: {
    attributes: ["className"],
  },
});
