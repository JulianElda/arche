import { page } from "vitest/browser";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-svelte";
import Card from "./card.svelte";

describe.skip("Card", () => {
  test("accepts and renders slot content", async () => {
    render(Card);
    await expect.element(page.getByText("Test Content")).toBeInTheDocument();
  });
});
