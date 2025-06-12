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
      className="size-8 rounded-md bg-white p-1">
      <GithubMarkDark className="size-6" />
    </a>
  );
}
