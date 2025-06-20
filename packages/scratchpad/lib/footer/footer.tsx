import { clsx } from "clsx";
import { useDarkMode } from "lib/commons/useDarkMode";
import { FooterContentDark } from "lib/footer/footer-content-dark";
import { FooterContentLight } from "lib/footer/footer-content-light";
import { FooterProps } from "lib/footer/footer.types";
import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";
import { Hyperlink } from "lib/hyperlink/hyperlink";

/**
 * Footer with dark mode and GitHub button. Add max-w-* to extraClass
 */
export function Footer(props: FooterProps) {
  const [isDarkMode, toggle] = useDarkMode();

  return (
    <footer
      className={clsx(
        "bg-app-background-light dark:bg-app-background-dark flex items-center p-2 sm:fixed sm:right-0 sm:bottom-0 sm:left-0 sm:mx-auto",
        props.extraClass
      )}>
      <div className="flex flex-1 items-center gap-1">
        {isDarkMode ? (
          <GitHubButtonDark href={props.link} />
        ) : (
          <GitHubButtonLight href={props.link} />
        )}
        <Hyperlink
          title={props.label}
          href={props.link}
          asterisk={false}
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
