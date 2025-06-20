import { HyperlinkProps } from "lib/hyperlink/hyperlink.types";

export function Hyperlink(props: HyperlinkProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="text-primary-900 dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300 decoration-dotted hover:underline">
      {props.title}
      {props.asterisk === false ? "" : "*"}
    </a>
  );
}
