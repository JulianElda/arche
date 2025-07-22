import { GithubMarkLight } from "lib/icons";

interface GitHubButtonLightProperties {
  href: string;
}

export function GitHubButtonLight(properties: GitHubButtonLightProperties) {
  return (
    <a
      aria-label={properties.href}
      className="size-8 rounded-md bg-app-background-dark p-1"
      href={properties.href}
      rel="noreferrer"
      target="_blank">
      <GithubMarkLight className="size-6" />
    </a>
  );
}
