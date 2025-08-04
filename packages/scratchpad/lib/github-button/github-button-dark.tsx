import { GithubMarkDark } from "lib/icons";

interface GitHubButtonDarkProperties {
  href: string;
}

export function GitHubButtonDark(properties: GitHubButtonDarkProperties) {
  return (
    <div className="flex">
      <a
        aria-label={properties.href}
        className="size-8 rounded-md bg-app-background-light p-1"
        href={properties.href}
        rel="noreferrer"
        target="_blank">
        <GithubMarkDark className="size-6" />
      </a>
    </div>
  );
}
