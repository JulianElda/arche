import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import InputField from "./input-field.svelte";

test("render elements", async () => {
  const { getByPlaceholder, getByRole, getByTestId } = render(InputField, {
    props: {
      id: "test-input-field",
      onChange: vi.fn(),
      placeholder: "Enter text...",
      type: "text",
      value: "",
    },
  });
  await expect.element(getByTestId("test-input-field")).toBeInTheDocument();
  await expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("call onChange handler when input changes", async () => {
  const onChangeMock = vi.fn();
  const { getByRole } = render(InputField, {
    props: {
      id: "test-input-field",
      onChange: onChangeMock,
      placeholder: "Enter text...",
      type: "text",
      value: "",
    },
  });
  const input = getByRole("textbox");
  await input.fill("test");
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith("test");
});
