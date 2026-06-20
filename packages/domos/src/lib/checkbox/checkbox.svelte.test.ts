import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { checkboxProps } from "./checkbox.mocks.ts";
import Checkbox from "./checkbox.svelte";

test("render checkbox element", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = render(
    Checkbox,
    { props: checkboxProps },
  );

  await expect
    .element(getByTestId(checkboxProps["data-testid"]!))
    .toBeInTheDocument();
  await expect.element(getByLabelText(checkboxProps.label)).toBeInTheDocument();
  await expect.element(getByText(checkboxProps.label)).toBeInTheDocument();
  await expect.element(getByRole("checkbox")).toBeInTheDocument();
});

test("calls onchange handler when clicked", async () => {
  const onchange = vi.fn<(e: Event) => void>();
  const { getByRole } = render(Checkbox, {
    props: { ...checkboxProps, checked: false, onchange },
  });
  await getByRole("checkbox").click();
  expect(onchange).toHaveBeenCalledOnce();
});

test("renders with checked state", async () => {
  const { getByRole } = render(Checkbox, { props: checkboxProps });
  await expect.element(getByRole("checkbox")).toHaveProperty("checked", true);
});

describe("disabled prop", () => {
  test("checkbox element has disabled attribute when disabled={true}", async () => {
    const { getByTestId } = render(Checkbox, {
      props: { ...checkboxProps, disabled: true },
    });
    await expect
      .element(getByTestId(checkboxProps["data-testid"]!))
      .toBeDisabled();
  });

  test("checkbox element does not have disabled attribute when disabled={false}", async () => {
    const { getByTestId } = render(Checkbox, {
      props: { ...checkboxProps, disabled: false },
    });
    await expect
      .element(getByTestId(checkboxProps["data-testid"]!))
      .not.toBeDisabled();
  });
});
