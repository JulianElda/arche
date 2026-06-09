import type { FooterProps } from "./footer.types";

import { useDarkMode } from "../commons/use-dark-mode";
import { GitHubButton } from "../github-button/github-button";
import { Hyperlink } from "../hyperlink/hyperlink";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

/**
 * Footer with dark mode and GitHub button.
 */
export function Footer(props: FooterProps) {
  const { link } = props;

  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <footer className="bg-app-background-light dark:bg-app-background-dark flex w-full items-center p-2">
      <div className="flex flex-1 items-center gap-1">
        <GitHubButton
          isDarkMode={isDarkMode}
          link={link}
        />
        <Hyperlink
          asterisk={true}
          href="https://julianelda.io"
          title="Julius Polar"
        />
      </div>
      <ThemeToggle
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </footer>
  );
}
