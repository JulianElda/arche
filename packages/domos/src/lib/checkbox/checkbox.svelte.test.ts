import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { checkboxProps } from "./checkbox.mocks.ts";
import Checkbox from "./checkbox.svelte";

test("render checkbox element", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = render(
    Checkbox,
    {
      props: {
        ...checkboxProps,
        onChange: vi.fn<() => void>(),
      },
    },
  );

  await expect.element(getByTestId(checkboxProps.id)).toBeInTheDocument();
  await expect.element(getByLabelText(checkboxProps.label)).toBeInTheDocument();
  await expect.element(getByText(checkboxProps.label)).toBeInTheDocument();
  await expect.element(getByRole("checkbox")).toBeInTheDocument();
});

test("calls onChange handler when checked", async () => {
  const onChangeMock = vi.fn<() => void>();
  const { getByRole } = render(Checkbox, {
    props: {
      ...checkboxProps,
      onChange: onChangeMock,
      value: false,
    },
  });
  const checkbox = getByRole("checkbox");
  await checkbox.click();
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(true);
  await checkbox.click();
  expect(onChangeMock).toHaveBeenCalledTimes(2);
  expect(onChangeMock).toHaveBeenCalledWith(false);
});

test("renders with checked state", async () => {
  const { getByRole } = render(Checkbox, {
    props: {
      ...checkboxProps,
      onChange: vi.fn<() => void>(),
    },
  });
  const checkbox = getByRole("checkbox");
  await expect.element(checkbox).toHaveProperty("checked", true);
});

describe("disabled prop", () => {
  test("checkbox element has disabled attribute when disabled={true}", async () => {
    const { getByTestId } = render(Checkbox, {
      props: {
        ...checkboxProps,
        disabled: true,
      },
    });
    const checkbox = getByTestId(checkboxProps.id);
    await expect.element(checkbox).toBeDisabled();
  });

  test("checkbox element does not have disabled attribute when disabled={false}", async () => {
    const { getByTestId } = render(Checkbox, {
      props: {
        ...checkboxProps,
        disabled: false,
      },
    });
    const checkbox = getByTestId(checkboxProps.id);
    await expect.element(checkbox).not.toBeDisabled();
  });
});
