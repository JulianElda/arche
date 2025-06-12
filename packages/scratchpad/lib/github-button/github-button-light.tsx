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
      className="size-8 rounded-md bg-slate-700 p-1">
      <GithubMarkLight className="size-6" />
    </a>
  );
}
