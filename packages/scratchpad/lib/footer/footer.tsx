import type { FooterProps } from "lib/footer/footer.types";

import { useDarkMode } from "lib/commons/use-dark-mode";
import { GitHubButton } from "lib/github-button/github-button";
import { Hyperlink } from "lib/hyperlink/hyperlink";
import { ThemeToggle } from "lib/theme-toggle/theme-toggle";

/**
 * Footer with dark mode and GitHub button.
 */
export function Footer(props: FooterProps) {
  const { link } = props;

  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <footer
      className={`
        flex w-full items-center bg-app-background-light p-2
        dark:bg-app-background-dark
      `}>
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
