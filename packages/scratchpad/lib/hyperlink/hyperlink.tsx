import type { HyperlinkProps } from "lib/hyperlink/hyperlink.types";

export function Hyperlink(props: HyperlinkProps) {
  const { asterisk, href, title } = props;

  return (
    <a
      className="text-primary-900 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 decoration-dotted hover:underline"
      href={href}
      rel="noreferrer"
      target="_blank">
      {`${title}${asterisk === false ? "" : "*"}`}
    </a>
  );
}
