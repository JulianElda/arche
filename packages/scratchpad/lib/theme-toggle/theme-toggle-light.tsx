import { ThemeMoon } from "lib/icons";

interface ThemeToggleLightProperties {
  onToggleDarkMode: () => void;
}

export function ThemeToggleLight(properties: ThemeToggleLightProperties) {
  return (
    <button
      aria-label="Toggle dark mode"
      className={`
        size-8 cursor-pointer rounded-md bg-app-background-dark p-1
        text-app-text-dark
      `}
      data-testid="footer-toggle-dark"
      onClick={() => properties.onToggleDarkMode()}>
      <ThemeMoon className="size-6 stroke-2" />
    </button>
  );
}
