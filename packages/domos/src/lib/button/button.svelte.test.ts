import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import Button from "./button.svelte";

describe("Button", () => {
  test("accepts and renders props", async () => {
    const { getByTestId, getByRole, getByText } = render(Button, {
      props: {
        id: "button-id",
        style: "primary",
        text: "Test Button",
        type: "button",
        onClick: vi.fn(),
      },
    });
    await expect.element(getByTestId("button-id")).toBeInTheDocument();
    await expect
      .element(getByRole("button", { name: "Test Button" }))
      .toBeInTheDocument();
    await expect.element(getByText("Test Button")).toBeInTheDocument();
  });
});
