import type { HyperlinkProperties } from "lib/hyperlink/hyperlink.types";

export function Hyperlink(properties: HyperlinkProperties) {
  return (
    <a
      className={`
        text-primary-900 decoration-dotted
        hover:text-primary-700 hover:underline
        dark:text-primary-100 dark:hover:text-primary-300
      `}
      href={properties.href}
      rel="noreferrer"
      target="_blank">
      {`${properties.title}${properties.asterisk === false ? "" : "*"}`}
    </a>
  );
}
