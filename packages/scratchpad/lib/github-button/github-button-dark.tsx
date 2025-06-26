import { GithubMarkDark } from "lib/icons";

interface GitHubButtonDarkProperties {
  href: string;
}

export function GitHubButtonDark(properties: GitHubButtonDarkProperties) {
  return (
    <a
      aria-label={properties.href}
      className="bg-app-background-light size-8 rounded-md p-1"
      href={properties.href}
      rel="noreferrer"
      target="_blank">
      <GithubMarkDark className="size-6" />
    </a>
  );
}
