import type { ThemeToggleProperties } from "lib/theme-toggle/theme-toggle.types";

import { ThemeToggleDark } from "lib/theme-toggle/theme-toggle-dark";
import { ThemeToggleLight } from "lib/theme-toggle/theme-toggle-light";

export function ThemeToggle(properties: ThemeToggleProperties) {
  return properties.isDarkMode ? (
    <ThemeToggleDark onToggleDarkMode={properties.onToggleDarkMode} />
  ) : (
    <ThemeToggleLight onToggleDarkMode={properties.onToggleDarkMode} />
  );
}
