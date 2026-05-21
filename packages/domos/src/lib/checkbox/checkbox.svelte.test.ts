import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import Checkbox from "./checkbox.svelte";

test("render checkbox element", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = render(
    Checkbox,
    {
      props: {
        id: "test-checkbox",
        label: "Test Checkbox",
        onChange: vi.fn(),
        value: false,
      },
    },
  );
  await expect.element(getByTestId("test-checkbox")).toBeInTheDocument();
  await expect.element(getByLabelText("Test Checkbox")).toBeInTheDocument();
  await expect.element(getByText("Test Checkbox")).toBeInTheDocument();
  await expect.element(getByRole("checkbox")).toBeInTheDocument();
});

test("calls onChange handler when checked", async () => {
  const onChangeMock = vi.fn();
  const { getByRole } = render(Checkbox, {
    props: {
      id: "test-checkbox",
      label: "Test Checkbox",
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
      id: "test-checkbox",
      label: "Test Checkbox",
      onChange: vi.fn(),
      value: true,
    },
  });
  const checkbox = getByRole("checkbox");
  await expect.element(checkbox).toHaveProperty("checked", true);
});
