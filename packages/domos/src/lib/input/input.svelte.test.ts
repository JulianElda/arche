import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { inputProps1 } from "./input.mocks.ts";
import Input from "./input.svelte";

test("render elements", async () => {
  const { getByLabelText, getByPlaceholder, getByRole, getByTestId } = render(
    Input,
    { props: inputProps1 },
  );
  await expect
    .element(getByTestId(inputProps1["data-testid"]!))
    .toBeInTheDocument();
  await expect.element(getByLabelText(inputProps1.label)).toBeInTheDocument();
  await expect
    .element(getByPlaceholder(inputProps1.placeholder!))
    .toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("calls oninput handler when input changes", async () => {
  const oninput = vi.fn<(e: Event) => void>();
  const { getByRole } = render(Input, {
    props: { ...inputProps1, oninput, value: "" },
  });
  await getByRole("textbox").fill("test");
  expect(oninput).toHaveBeenCalledOnce();
});

test("hideLabel=false shows label visually", async () => {
  const { getByText } = render(Input, {
    props: { ...inputProps1, hideLabel: false },
  });
  await expect.element(getByText(inputProps1.label)).toBeVisible();
});

test("hideLabel=true hides label visually but keeps it accessible", async () => {
  const { getByLabelText, getByText } = render(Input, {
    props: { ...inputProps1, hideLabel: true },
  });
  await expect.element(getByText(inputProps1.label)).toHaveClass("sr-only");
  await expect.element(getByLabelText(inputProps1.label)).toBeInTheDocument();
});
