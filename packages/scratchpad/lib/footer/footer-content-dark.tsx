import { ThemeSun } from "lib/icons";

interface FooterContentDarkProperties {
  onToggleDarkMode: () => void;
}

export function FooterContentDark(properties: FooterContentDarkProperties) {
  return (
    <button
      aria-label="Toggle light mode"
      className="bg-app-background-light text-app-text-light size-8 cursor-pointer rounded-md p-1"
      data-testid="footer-toggle-light"
      onClick={() => properties.onToggleDarkMode()}>
      <ThemeSun className="size-6 stroke-2" />
    </button>
  );
}
