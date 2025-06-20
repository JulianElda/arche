import { ThemeSun } from "lib/icons";

type FooterContentDarkProps = {
  onToggleDarkMode: () => void;
};

export function FooterContentDark(props: FooterContentDarkProps) {
  return (
    <button
      aria-label="Toggle light mode"
      data-testid="footer-toggle-light"
      className="bg-app-background-light text-app-text-light size-8 cursor-pointer rounded-md p-1"
      onClick={() => props.onToggleDarkMode()}>
      <ThemeSun className="size-6 stroke-2" />
    </button>
  );
}
