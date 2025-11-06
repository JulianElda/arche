import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropsAsterisk,
  hyperlinkPropsDefault,
  hyperlinkPropsNoAsterisk,
} from "./hyperlink.mocks";

test("renders without asterisks by default", async () => {
  const { getByText } = await render(<Hyperlink {...hyperlinkPropsDefault} />);
  const linkElement = getByText(hyperlinkPropsDefault.title + "*");
  await expect.element(linkElement).toBeInTheDocument();
  await expect
    .element(linkElement)
    .toHaveAttribute("href", hyperlinkPropsDefault.href);
});

test("renders with asterisks when specified", async () => {
  const { getByText } = await render(<Hyperlink {...hyperlinkPropsAsterisk} />);
  const linkElement = getByText(hyperlinkPropsAsterisk.title + "*");
  await expect.element(linkElement).toBeInTheDocument();
  await expect
    .element(linkElement)
    .toHaveAttribute("href", hyperlinkPropsAsterisk.href);
});

test("renders without asterisks when specified", async () => {
  const { getByText } = await render(
    <Hyperlink {...hyperlinkPropsNoAsterisk} />
  );
  const linkElement = getByText(hyperlinkPropsNoAsterisk.title);
  await expect.element(linkElement).toBeInTheDocument();
  await expect
    .element(linkElement)
    .toHaveAttribute("href", hyperlinkPropsNoAsterisk.href);
});
