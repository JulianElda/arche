import { ThemeMoon } from "lib/icons";

type FooterContentLightProps = {
  onToggleDarkMode: () => void;
};

export function FooterContentLight(props: FooterContentLightProps) {
  return (
    <button
      aria-label="Toggle dark mode"
      data-testid="footer-toggle-dark"
      className="size-8 cursor-pointer rounded-md bg-slate-700 p-1 text-white"
      onClick={() => props.onToggleDarkMode()}>
      <ThemeMoon className="size-6 stroke-2" />
    </button>
  );
}
