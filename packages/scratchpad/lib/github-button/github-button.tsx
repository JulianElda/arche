import type { GitHubButtonProps } from "lib/github-button/github-button.types";

import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";

export function GitHubButton(props: GitHubButtonProps) {
  const { isDarkMode, link } = props;

  return isDarkMode ? (
    <GitHubButtonDark href={link} />
  ) : (
    <GitHubButtonLight href={link} />
  );
}
