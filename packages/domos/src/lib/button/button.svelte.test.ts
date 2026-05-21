import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import Button from "./button.svelte";

test("render elements", async () => {
  const { getByRole, getByTestId, getByText } = render(Button, {
    props: {
      id: "button-id",
      onClick: vi.fn(),
      style: "primary",
      text: "Test Button",
      type: "button",
    },
  });
  await expect.element(getByTestId("button-id")).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: "Test Button" }))
    .toBeInTheDocument();
  await expect.element(getByText("Test Button")).toBeInTheDocument();
});

test("call onClick handler when clicked", async () => {
  const onClickMock = vi.fn();
  const { getByRole } = render(Button, {
    props: {
      id: "button-id",
      onClick: onClickMock,
      style: "primary",
      text: "Test Button",
      type: "button",
    },
  });
  const button = getByRole("button", { name: "Test Button" });
  await button.click();
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
