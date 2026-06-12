import { useState } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import type { CheckboxProps } from "./checkbox.types.ts";

import { checkboxProps } from "./checkbox.mocks.tsx";
import { Checkbox } from "./checkbox.tsx";

const CheckboxTemplate = (props: CheckboxProps) => {
  const { hideLabel, id, label } = props;
  const [value, setValue] = useState<boolean>(props.value ?? true);

  const handleChange = (newValue: boolean) => {
    setValue(newValue);
  };

  return (
    <Checkbox
      hideLabel={hideLabel}
      id={id}
      label={label}
      onChange={handleChange}
      value={value}
    />
  );
};

test("renders elements", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = await render(
    <Checkbox
      id={checkboxProps.id}
      label={checkboxProps.label}
      onChange={checkboxProps.onChange}
      value={checkboxProps.value}
    />,
  );
  await expect.element(getByTestId(checkboxProps.id)).toBeInTheDocument();
  await expect.element(getByLabelText(checkboxProps.label)).toBeInTheDocument();
  await expect.element(getByText(checkboxProps.label)).toBeInTheDocument();
  await expect
    .element(getByRole("checkbox", { name: checkboxProps.label }))
    .toBeInTheDocument();
});

test("renders elements with hidden label", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = await render(
    <Checkbox
      hideLabel={true}
      id={checkboxProps.id}
      label={checkboxProps.label}
      onChange={checkboxProps.onChange}
      value={checkboxProps.value}
    />,
  );
  await expect.element(getByTestId(checkboxProps.id)).toBeInTheDocument();
  await expect.element(getByLabelText(checkboxProps.label)).toBeInTheDocument();
  await expect.element(getByText(checkboxProps.label)).toBeInTheDocument();
  await expect
    .element(getByRole("checkbox", { name: checkboxProps.label }))
    .toBeInTheDocument();
});

test("initial value checked", async () => {
  const { getByTestId } = await render(
    <Checkbox
      id={checkboxProps.id}
      label={checkboxProps.label}
      onChange={checkboxProps.onChange}
      value={checkboxProps.value}
    />,
  );
  await expect.element(getByTestId(checkboxProps.id)).toBeChecked();
});

test("initial value not checked", async () => {
  const { getByTestId } = await render(
    <Checkbox
      id={checkboxProps.id}
      label={checkboxProps.label}
      onChange={checkboxProps.onChange}
      value={false}
    />,
  );
  await expect.element(getByTestId(checkboxProps.id)).not.toBeChecked();
});

test("change value", async () => {
  const { getByTestId } = await render(
    <CheckboxTemplate
      id={checkboxProps.id}
      label={checkboxProps.label}
      onChange={checkboxProps.onChange}
      value={checkboxProps.value}
    />,
  );
  const checkbox = getByTestId(checkboxProps.id);
  await expect.element(checkbox).toBeChecked();
  await checkbox.click();
  await expect.element(checkbox).not.toBeChecked();
  await checkbox.click();
  await expect.element(checkbox).toBeChecked();
});
