import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import InputSelect from "./input-select.svelte";

test("render elements", async () => {
  const { getByLabelText, getByTestId, getByRole } = render(InputSelect, {
    props: {
      inputId: "test-input",
      selectId: "test-select",
      inputLabel: "Test Input Select",
      selectLabel: "Select an option",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
      inputValue: "",
      selectValue: "option1",
      onInputChange: vi.fn(),
      onSelectChange: vi.fn(),
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
  const onInputChangeMock = vi.fn();
  const onSelectChangeMock = vi.fn();
  const { getByTestId } = render(InputSelect, {
    props: {
      inputId: "test-input",
      selectId: "test-select",
      inputLabel: "Test Input Select",
      selectLabel: "Select an option",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
      inputValue: "",
      selectValue: "option1",
      onInputChange: onInputChangeMock,
      onSelectChange: onSelectChangeMock,
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
