import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import Input from "./input.svelte";

test("render elements", async () => {
  const { getByLabelText, getByPlaceholder, getByRole, getByTestId } = render(
    Input,
    {
      props: {
        id: "test-input",
        label: "Test Input",
        onChange: vi.fn(),
        placeholder: "Enter text...",
        type: "text",
        value: "",
      },
    },
  );
  await expect.element(getByTestId("test-input")).toBeInTheDocument();
  await expect.element(getByLabelText("Test Input")).toBeInTheDocument();
  await expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("callback when input changes", async () => {
  const onChangeMock = vi.fn();
  const { getByRole } = render(Input, {
    props: {
      id: "test-input",
      label: "Test Input",
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
