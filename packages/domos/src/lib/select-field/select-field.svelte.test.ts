import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { selectFieldProps1 } from "./select-field.mocks.ts";
import SelectField from "./select-field.svelte";

test("render elements", async () => {
  const { getByRole, getByTestId } = render(SelectField, {
    props: selectFieldProps1,
  });
  await expect
    .element(getByTestId(selectFieldProps1["data-testid"]!))
    .toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
});

test("reflects selected value", async () => {
  const { getByRole } = render(SelectField, { props: selectFieldProps1 });
  await expect
    .element(getByRole("combobox"))
    .toHaveValue(selectFieldProps1.value as string);
});

test("calls oninput handler when selection changes", async () => {
  const oninput = vi.fn<(e: Event) => void>();
  const { getByRole } = render(SelectField, {
    props: { ...selectFieldProps1, oninput, value: "" },
  });
  await getByRole("combobox").selectOptions(selectFieldProps1.options[1].value);
  expect(oninput).toHaveBeenCalledOnce();
});

test("forwards id attribute to select element", async () => {
  const { getByRole } = render(SelectField, { props: selectFieldProps1 });
  await expect
    .element(getByRole("combobox"))
    .toHaveAttribute("id", selectFieldProps1.id);
});

test("forwards name attribute to select element", async () => {
  const { getByRole } = render(SelectField, {
    props: { ...selectFieldProps1, name: "currency" },
  });
  await expect
    .element(getByRole("combobox"))
    .toHaveAttribute("name", "currency");
});

test("forwards disabled attribute to select element", async () => {
  const { getByRole } = render(SelectField, {
    props: { ...selectFieldProps1, disabled: true },
  });
  await expect.element(getByRole("combobox")).toBeDisabled();
});

test("forwards aria-label attribute to select element", async () => {
  const { getByRole } = render(SelectField, {
    props: { ...selectFieldProps1, "aria-label": "Choose currency" },
  });
  await expect
    .element(getByRole("combobox"))
    .toHaveAttribute("aria-label", "Choose currency");
});

test("calls onchange handler when selection changes", async () => {
  const onchange = vi.fn<(e: Event) => void>();
  const { getByRole } = render(SelectField, {
    props: { ...selectFieldProps1, onchange, value: "" },
  });
  await getByRole("combobox").selectOptions(selectFieldProps1.options[1].value);
  expect(onchange).toHaveBeenCalledOnce();
});
