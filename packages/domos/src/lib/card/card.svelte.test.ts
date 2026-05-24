import { createRawSnippet } from "svelte";
import { expect, test } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import Card from "./card.svelte";

test("accepts and renders slot content", async () => {
  const testSnippet = createRawSnippet(() => ({
    render: () => "<p>Test Content</p>",
    setup: () => {},
  }));

  render(Card, {
    props: {
      children: testSnippet,
    },
  });
  await expect.element(page.getByText("Test Content")).toBeInTheDocument();
});
