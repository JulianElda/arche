import { ThemeMoon } from "lib/icons";

type FooterContentLightProps = {
  onToggleDarkMode: () => void;
};

export function FooterContentLight(props: FooterContentLightProps) {
  return (
    <button
      aria-label="Toggle dark mode"
      data-testid="footer-toggle-dark"
      className="bg-app-background-dark text-app-text-dark size-8 cursor-pointer rounded-md p-1"
      onClick={() => props.onToggleDarkMode()}>
      <ThemeMoon className="size-6 stroke-2" />
    </button>
  );
}
