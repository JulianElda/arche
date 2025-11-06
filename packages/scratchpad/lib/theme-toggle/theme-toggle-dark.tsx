import { ThemeSun } from "lib/icons";

interface ThemeToggleDarkProps {
  onToggleDarkMode: () => void;
}

export function ThemeToggleDark(props: ThemeToggleDarkProps) {
  const { onToggleDarkMode } = props;

  return (
    <button
      aria-label="Toggle light mode"
      className={`
        size-8 cursor-pointer rounded-md bg-app-background-light p-1
        text-app-text-light
      `}
      data-testid="footer-toggle-light"
      onClick={() => onToggleDarkMode()}>
      <ThemeSun className="size-6 stroke-2" />
    </button>
  );
}
