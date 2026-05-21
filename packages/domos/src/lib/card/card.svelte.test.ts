import { expect, test } from "vitest";
import { render } from "vitest-browser-svelte";
import { page } from "vitest/browser";

import Card from "./card.svelte";

test.skip("accepts and renders slot content", async () => {
  render(Card);
  await expect.element(page.getByText("Test Content")).toBeInTheDocument();
});
