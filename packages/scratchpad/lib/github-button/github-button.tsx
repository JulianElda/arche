import type { GitHubButtonProps } from "./github-button.types";

import { GitHubButtonDark } from "./github-button-dark";
import { GitHubButtonLight } from "./github-button-light";

export function GitHubButton(props: GitHubButtonProps) {
  const { isDarkMode, link } = props;

  return isDarkMode ? (
    <GitHubButtonDark href={link} />
  ) : (
    <GitHubButtonLight href={link} />
  );
}
