import { ThemeMoon } from "lib/icons";

interface ThemeToggleLightProps {
  onToggleDarkMode: () => void;
}

export function ThemeToggleLight(props: ThemeToggleLightProps) {
  const { onToggleDarkMode } = props;
  return (
    <button
      aria-label="Toggle dark mode"
      className="bg-app-background-dark text-app-text-dark size-8 cursor-pointer rounded-md p-1"
      data-testid="footer-toggle-dark"
      onClick={() => onToggleDarkMode()}>
      <ThemeMoon className="size-6 stroke-2" />
    </button>
  );
}
