import type { ThemeToggleProps } from "lib/theme-toggle/theme-toggle.types";

import { ThemeToggleDark } from "lib/theme-toggle/theme-toggle-dark";
import { ThemeToggleLight } from "lib/theme-toggle/theme-toggle-light";

export function ThemeToggle(props: ThemeToggleProps) {
  const { isDarkMode, onToggleDarkMode } = props;

  return isDarkMode ? (
    <ThemeToggleDark onToggleDarkMode={onToggleDarkMode} />
  ) : (
    <ThemeToggleLight onToggleDarkMode={onToggleDarkMode} />
  );
}
