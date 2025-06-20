import { GithubMarkDark } from "lib/icons";

type GitHubButtonDarkProps = {
  href: string;
};

export function GitHubButtonDark(props: GitHubButtonDarkProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      aria-label={props.href}
      className="bg-app-background-light size-8 rounded-md p-1">
      <GithubMarkDark className="size-6" />
    </a>
  );
}
