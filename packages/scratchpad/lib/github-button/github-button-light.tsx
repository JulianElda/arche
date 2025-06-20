import { GithubMarkLight } from "lib/icons";

type GitHubButtonLightProps = {
  href: string;
};

export function GitHubButtonLight(props: GitHubButtonLightProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      aria-label={props.href}
      className="bg-app-background-dark size-8 rounded-md p-1">
      <GithubMarkLight className="size-6" />
    </a>
  );
}
