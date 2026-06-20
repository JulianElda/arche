import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { inputSelectProps1 } from "./input-select.mocks.ts";
import InputSelect from "./input-select.svelte";

test("render elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = render(InputSelect, {
    props: inputSelectProps1,
  });
  await expect
    .element(getByTestId(inputSelectProps1.inputProps["data-testid"]!))
    .toBeInTheDocument();
  await expect
    .element(getByTestId(inputSelectProps1.selectProps["data-testid"]!))
    .toBeInTheDocument();
  await expect
    .element(getByLabelText(inputSelectProps1.inputProps.label))
    .toBeInTheDocument();
  await expect
    .element(getByLabelText(inputSelectProps1.selectProps.label))
    .toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("calls input oninput handler when input changes", async () => {
  const oninput = vi.fn<(e: Event) => void>();
  const { getByRole } = render(InputSelect, {
    props: {
      ...inputSelectProps1,
      inputProps: { ...inputSelectProps1.inputProps, oninput, value: "" },
    },
  });
  await getByRole("textbox").fill("test");
  expect(oninput).toHaveBeenCalledOnce();
});

test("calls select oninput handler when selection changes", async () => {
  const oninput = vi.fn<(e: Event) => void>();
  const { getByRole } = render(InputSelect, {
    props: {
      ...inputSelectProps1,
      selectProps: { ...inputSelectProps1.selectProps, oninput },
    },
  });
  await getByRole("combobox").selectOptions(
    inputSelectProps1.selectProps.options[1].value,
  );
  expect(oninput).toHaveBeenCalledOnce();
});
