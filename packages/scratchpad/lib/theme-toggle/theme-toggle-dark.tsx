import { ThemeSun } from "../icons";

interface ThemeToggleDarkProps {
  onToggleDarkMode: () => void;
}

export function ThemeToggleDark(props: ThemeToggleDarkProps) {
  const { onToggleDarkMode } = props;

  return (
    <button
      aria-label="Toggle light mode"
      className="bg-app-background-light text-app-text-light size-8 cursor-pointer rounded-md p-1"
      data-testid="footer-toggle-light"
      onClick={onToggleDarkMode}
      type="button">
      <ThemeSun className="size-6 stroke-2" />
    </button>
  );
}
