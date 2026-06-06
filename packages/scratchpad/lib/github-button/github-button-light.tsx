import { GithubMarkLight } from "lib/icons";

interface GitHubButtonLightProps {
  href: string;
}

export function GitHubButtonLight(props: GitHubButtonLightProps) {
  const { href } = props;

  return (
    <div className="flex">
      <a
        aria-label={href}
        className="bg-app-background-dark size-8 rounded-md p-1"
        href={href}
        rel="noreferrer"
        target="_blank">
        <GithubMarkLight className="size-6" />
      </a>
    </div>
  );
}
