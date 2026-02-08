import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import SelectField from "./select-field.svelte";

test("render elements", async () => {
  const { getByTestId, getByRole } = render(SelectField, {
    props: {
      id: "test-select-field",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
      value: "",
      onChange: vi.fn(),
    },
  });
  await expect.element(getByTestId("test-select-field")).toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
});

test("callback when select changes", async () => {
  const onChangeMock = vi.fn();
  const { getByTestId } = render(SelectField, {
    props: {
      id: "test-select-field",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
      value: "",
      onChange: onChangeMock,
    },
  });
  const select = getByTestId("test-select-field");
  await select.selectOptions("option2");
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith("option2");
});
