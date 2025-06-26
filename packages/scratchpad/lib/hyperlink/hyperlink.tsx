import type { HyperlinkProperties } from "lib/hyperlink/hyperlink.types";

export function Hyperlink(properties: HyperlinkProperties) {
  return (
    <a
      className="text-primary-900 dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300 decoration-dotted hover:underline"
      href={properties.href}
      rel="noreferrer"
      target="_blank">
      {properties.title}
      {properties.asterisk === false ? "" : "*"}
    </a>
  );
}
