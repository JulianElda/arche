import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import Select from "./select.svelte";

test("render elements", async () => {
  const { getByLabelText, getByTestId, getByRole } = render(Select, {
    props: {
      id: "test-select",
      label: "Test Select",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
      value: "",
      onChange: vi.fn(),
    },
  });
  await expect.element(getByTestId("test-select")).toBeInTheDocument();
  await expect.element(getByLabelText("Test Select")).toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
});

test("callback when select changes", async () => {
  const onChangeMock = vi.fn();
  const { getByTestId } = render(Select, {
    props: {
      id: "test-select",
      label: "Test Select",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
      value: "",
      onChange: onChangeMock,
    },
  });
  const select = getByTestId("test-select");
  await select.selectOptions("option2");
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith("option2");
});
