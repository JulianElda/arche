import { ThemeSun } from "lib/icons";

type FooterContentDarkProps = {
  onToggleDarkMode: () => void;
};

export function FooterContentDark(props: FooterContentDarkProps) {
  return (
    <button
      aria-label="Toggle light mode"
      data-testid="footer-toggle-light"
      className="size-8 cursor-pointer rounded-md bg-white p-1 text-gray-900"
      onClick={() => props.onToggleDarkMode()}>
      <ThemeSun className="size-6 stroke-2" />
    </button>
  );
}
