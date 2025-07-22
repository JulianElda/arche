import { ThemeSun } from "lib/icons";

interface FooterContentDarkProperties {
  onToggleDarkMode: () => void;
}

export function FooterContentDark(properties: FooterContentDarkProperties) {
  return (
    <button
      aria-label="Toggle light mode"
      className={`
        size-8 cursor-pointer rounded-md bg-app-background-light p-1
        text-app-text-light
      `}
      data-testid="footer-toggle-light"
      onClick={() => properties.onToggleDarkMode()}>
      <ThemeSun className="size-6 stroke-2" />
    </button>
  );
}
