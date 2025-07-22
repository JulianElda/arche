import type { FooterProperties } from "lib/footer/footer.types";

import { clsx } from "clsx";
import { useDarkMode } from "lib/commons/use-dark-mode";
import { FooterContentDark } from "lib/footer/footer-content-dark";
import { FooterContentLight } from "lib/footer/footer-content-light";
import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";
import { Hyperlink } from "lib/hyperlink/hyperlink";

/**
 * Footer with dark mode and GitHub button. Add max-w-* to extraClass
 */
export function Footer(properties: FooterProperties) {
  const [isDarkMode, toggle] = useDarkMode();

  return (
    <footer
      className={clsx(
        `
          flex items-center bg-app-background-light p-2
          sm:fixed sm:right-0 sm:bottom-0 sm:left-0 sm:mx-auto
          dark:bg-app-background-dark
        `,
        properties.extraClass
      )}>
      <div className="flex flex-1 items-center gap-1">
        {isDarkMode ? (
          <GitHubButtonDark href={properties.link} />
        ) : (
          <GitHubButtonLight href={properties.link} />
        )}
        <Hyperlink
          asterisk={true}
          href="https://julianelda.io"
          title="Julius Polar"
        />
      </div>
      {isDarkMode ? (
        <FooterContentDark onToggleDarkMode={toggle} />
      ) : (
        <FooterContentLight onToggleDarkMode={toggle} />
      )}
    </footer>
  );
}
