import type { FooterProperties } from "lib/footer/footer.types";

import { useDarkMode } from "lib/commons/use-dark-mode";
import { FooterContentDark } from "lib/footer/footer-content-dark";
import { FooterContentLight } from "lib/footer/footer-content-light";
import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";
import { Hyperlink } from "lib/hyperlink/hyperlink";

/**
 * Footer with dark mode and GitHub button.
 */
export function Footer(properties: FooterProperties) {
  const [isDarkMode, toggle] = useDarkMode();

  return (
    <footer
      className={`
        fixed inset-x-0 bottom-0 mx-auto flex w-full items-center
        bg-app-background-light p-2
        dark:bg-app-background-dark
      `}>
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
