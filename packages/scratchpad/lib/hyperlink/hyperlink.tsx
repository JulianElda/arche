import { HyperlinkProps } from "lib/hyperlink/hyperlink.types";

export function Hyperlink(props: HyperlinkProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="text-primary-darkest dark:text-primary-lightest hover:text-primary-darker dark:hover:text-primary-lighter decoration-dotted hover:underline">
      {props.title}
      {props.asterisk === false ? "" : "*"}
    </a>
  );
}
