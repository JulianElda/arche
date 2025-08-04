import { useDarkMode } from "lib/commons/use-dark-mode";
import { ThemeToggleDark } from "lib/theme-toggle/theme-toggle-dark";
import { ThemeToggleLight } from "lib/theme-toggle/theme-toggle-light";

export function ThemeToggle() {
  const [isDarkMode, toggle] = useDarkMode();
  return isDarkMode ? (
    <ThemeToggleDark onToggleDarkMode={toggle} />
  ) : (
    <ThemeToggleLight onToggleDarkMode={toggle} />
  );
}
