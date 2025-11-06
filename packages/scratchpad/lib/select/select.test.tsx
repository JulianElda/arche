import type { SelectProps } from "lib/select/select.types";

import { useState } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Select } from "./select";
import { selectProps1 } from "./select.mocks";

const SelectTemplate = (arguments_: SelectProps) => {
  const [value, setValue] = useState(arguments_.value ?? "");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

test("renders elements with label", async () => {
  const { getByLabelText, getByRole, getByTestId } = await render(
    <Select {...selectProps1} />
  );

  await expect.element(getByTestId(selectProps1.id)).toBeInTheDocument();
  await expect.element(getByLabelText(selectProps1.label)).toBeInTheDocument();
  await expect
    .element(getByRole("combobox", { name: selectProps1.label }))
    .toBeInTheDocument();
  await Promise.all(
    selectProps1.options.map(async (option) => {
      await expect
        .element(getByRole("option", { name: option.label }))
        .toBeInTheDocument();
    })
  );
});

test("renders elements without label", async () => {
  const { getByLabelText, getByRole, getByTestId } = await render(
    <Select
      {...selectProps1}
      hideLabel={true}
    />
  );

  await expect.element(getByTestId(selectProps1.id)).toBeInTheDocument();
  await expect.element(getByLabelText(selectProps1.label)).toBeInTheDocument();
  await expect
    .element(getByRole("combobox", { name: selectProps1.label }))
    .toBeInTheDocument();
  await Promise.all(
    selectProps1.options.map(async (option) => {
      await expect
        .element(getByRole("option", { name: option.label }))
        .toBeInTheDocument();
    })
  );
});

test("initial value", async () => {
  const { getByTestId } = await render(<Select {...selectProps1} />);

  await expect
    .element(getByTestId(selectProps1.id))
    .toHaveValue(selectProps1.value);
});

test("change value", async () => {
  const { getByTestId } = await render(<SelectTemplate {...selectProps1} />);

  const selectElement = getByTestId(selectProps1.id);
  await selectElement.selectOptions(selectProps1.options[1].value);
  await expect
    .element(selectElement)
    .toHaveValue(selectProps1.options[1].value);
});
