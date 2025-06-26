import { ThemeMoon } from "lib/icons";

interface FooterContentLightProperties {
  onToggleDarkMode: () => void;
}

export function FooterContentLight(properties: FooterContentLightProperties) {
  return (
    <button
      aria-label="Toggle dark mode"
      className="bg-app-background-dark text-app-text-dark size-8 cursor-pointer rounded-md p-1"
      data-testid="footer-toggle-dark"
      onClick={() => properties.onToggleDarkMode()}>
      <ThemeMoon className="size-6 stroke-2" />
    </button>
  );
}
