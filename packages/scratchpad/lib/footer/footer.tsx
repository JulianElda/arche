import { useDarkMode } from "lib/commons/useDarkMode";
import { FooterContentDark } from "lib/footer/footer-content-dark";
import { FooterContentLight } from "lib/footer/footer-content-light";
import { FooterProps } from "lib/footer/footer.types";
import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";
import { Hyperlink } from "lib/hyperlink/hyperlink";

export function Footer(props: FooterProps) {
  const [isDarkMode, toggle] = useDarkMode();

  return (
    <footer className="mx-auto flex max-w-4xl items-center bg-gray-50 p-2 sm:fixed sm:right-0 sm:bottom-0 sm:left-0 dark:bg-gray-800">
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
