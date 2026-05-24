import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import InputSelect from "./input-select.svelte";

test("render elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = render(InputSelect, {
    props: {
      inputId: "test-input",
      inputLabel: "Test Input Select",
      inputValue: "",
      onInputChange: vi.fn<() => void>(),
      onSelectChange: vi.fn<() => void>(),
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
      selectId: "test-select",
      selectLabel: "Select an option",
      selectValue: "option1",
      type: "text",
    },
  });
  await expect.element(getByTestId("test-input")).toBeInTheDocument();
  await expect.element(getByTestId("test-select")).toBeInTheDocument();
  await expect.element(getByLabelText("Test Input Select")).toBeInTheDocument();
  await expect.element(getByLabelText("Select an option")).toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("callback when input and select changes", async () => {
  const onInputChangeMock = vi.fn<() => void>();
  const onSelectChangeMock = vi.fn<() => void>();
  const { getByTestId } = render(InputSelect, {
    props: {
      inputId: "test-input",
      inputLabel: "Test Input Select",
      inputValue: "",
      onInputChange: onInputChangeMock,
      onSelectChange: onSelectChangeMock,
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
      selectId: "test-select",
      selectLabel: "Select an option",
      selectValue: "option1",
      type: "text",
    },
  });
  const input = getByTestId("test-input");
  await input.fill("test");
  expect(onInputChangeMock).toHaveBeenCalledTimes(1);
  expect(onInputChangeMock).toHaveBeenLastCalledWith("test");

  const select = getByTestId("test-select");
  await select.selectOptions("option2");
  expect(onSelectChangeMock).toHaveBeenCalledTimes(1);
  expect(onSelectChangeMock).toHaveBeenLastCalledWith("option2");
});
