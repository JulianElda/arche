import type { GitHubButtonProperties } from "lib/github-button/github-button.types";

import { useDarkMode } from "lib/commons/use-dark-mode";
import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";

export function GitHubButton(properties: GitHubButtonProperties) {
  const [isDarkMode] = useDarkMode();

  return isDarkMode ? (
    <GitHubButtonDark href={properties.link} />
  ) : (
    <GitHubButtonLight href={properties.link} />
  );
}
