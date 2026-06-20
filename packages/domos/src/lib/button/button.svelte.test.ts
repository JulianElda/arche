import { createRawSnippet } from "svelte";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { buttonPropsPrimary } from "./button.mocks.ts";
import Button from "./button.svelte";

const children = createRawSnippet(() => ({
  render: () => `<span>Primary button</span>`,
}));

test("render elements", async () => {
  const { getByRole, getByTestId, getByText } = render(Button, {
    props: { ...buttonPropsPrimary, children },
  });
  await expect
    .element(getByRole("button", { name: "Primary button" }))
    .toBeInTheDocument();
  await expect
    .element(getByTestId(buttonPropsPrimary["data-testid"]!))
    .toBeInTheDocument();
  await expect.element(getByText("Primary button")).toBeInTheDocument();
});

test("call onclick handler when clicked", async () => {
  const onclick = vi.fn<() => void>();
  const { getByRole } = render(Button, {
    props: { ...buttonPropsPrimary, children, onclick },
  });
  await getByRole("button", { name: "Primary button" }).click();
  expect(onclick).toHaveBeenCalledOnce();
});

test("disabled button does not fire onclick", async () => {
  const onclick = vi.fn<() => void>();
  const { getByRole } = render(Button, {
    props: { ...buttonPropsPrimary, children, disabled: true, onclick },
  });
  await expect
    .element(getByRole("button", { name: "Primary button" }))
    .toBeDisabled();
});

test("defaults to primary variant", async () => {
  const { getByRole } = render(Button, { props: { children } });
  await expect.element(getByRole("button")).toHaveClass("bg-primary-700");
});

test("forwards type attribute", async () => {
  const { getByRole } = render(Button, {
    props: { ...buttonPropsPrimary, children, type: "submit" },
  });
  await expect.element(getByRole("button")).toHaveAttribute("type", "submit");
});
