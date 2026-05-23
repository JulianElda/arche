import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { inputFieldProps1 } from "./input-field.mocks.ts";
import InputField from "./input-field.svelte";

test("render elements", async () => {
  const { getByPlaceholder, getByRole, getByTestId } = render(InputField, {
    props: {
      ...inputFieldProps1,
      onChange: vi.fn(),
      placeholder: "Enter text...",
    },
  });

  await Promise.all([
    expect.element(getByTestId(inputFieldProps1.id)).toBeInTheDocument(),
    expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument(),
    expect.element(getByRole("textbox")).toBeInTheDocument(),
  ]);
});

test("call onChange handler when input changes", async () => {
  const onChangeMock = vi.fn();
  const { getByRole } = render(InputField, {
    props: {
      ...inputFieldProps1,
      onChange: onChangeMock,
      value: "",
    },
  });
  const input = getByRole("textbox");
  await input.fill("test");
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith("test");
});
