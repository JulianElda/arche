import { HyperlinkProps } from "./hyperlink.types";

export const hyperlinkPropsDefault: HyperlinkProps = {
  href: "https://julianelda.github.io",
  title: "GitHub",
};

export const hyperlinkPropsAsterisk: HyperlinkProps = {
  href: "https://julianelda.github.io",
  title: "GitHub",
  asterisk: true,
};

export const hyperlinkPropsNoAsterisk: HyperlinkProps = {
  href: "https://julianelda.github.io",
  title: "GitHub",
  asterisk: false,
};
