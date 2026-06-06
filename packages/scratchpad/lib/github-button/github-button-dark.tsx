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
        className="bg-app-background-light size-8 rounded-md p-1"
        href={href}
        rel="noreferrer"
        target="_blank">
        <GithubMarkDark className="size-6" />
      </a>
    </div>
  );
}
