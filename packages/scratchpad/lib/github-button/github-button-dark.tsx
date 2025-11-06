import { GithubMarkDark } from "lib/icons";

interface GitHubButtonDarkProps {
  href: string;
}

export function GitHubButtonDark(props: GitHubButtonDarkProps) {
  const { href } = props;

  return (
    <div className="flex">
      <a
        aria-label={href}
        className="size-8 rounded-md bg-app-background-light p-1"
        href={href}
        rel="noreferrer"
        target="_blank">
        <GithubMarkDark className="size-6" />
      </a>
    </div>
  );
}
