import type { GitHubButtonProperties } from "lib/github-button/github-button.types";

import { GitHubButtonDark } from "lib/github-button/github-button-dark";
import { GitHubButtonLight } from "lib/github-button/github-button-light";

export function GitHubButton(properties: GitHubButtonProperties) {
  return properties.isDarkMode ? (
    <GitHubButtonDark href={properties.link} />
  ) : (
    <GitHubButtonLight href={properties.link} />
  );
}
