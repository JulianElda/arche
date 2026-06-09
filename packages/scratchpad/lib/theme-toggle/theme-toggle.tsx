import type { ThemeToggleProps } from "./theme-toggle.types";

import { ThemeToggleDark } from "./theme-toggle-dark";
import { ThemeToggleLight } from "./theme-toggle-light";

export function ThemeToggle(props: ThemeToggleProps) {
  const { isDarkMode, onToggleDarkMode } = props;

  return isDarkMode ? (
    <ThemeToggleDark onToggleDarkMode={onToggleDarkMode} />
  ) : (
    <ThemeToggleLight onToggleDarkMode={onToggleDarkMode} />
  );
}
