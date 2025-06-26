import { GithubMarkLight } from "lib/icons";

interface GitHubButtonLightProperties {
  href: string;
}

export function GitHubButtonLight(properties: GitHubButtonLightProperties) {
  return (
    <a
      aria-label={properties.href}
      className="bg-app-background-dark size-8 rounded-md p-1"
      href={properties.href}
      rel="noreferrer"
      target="_blank">
      <GithubMarkLight className="size-6" />
    </a>
  );
}
