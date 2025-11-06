import type { InputSelectProps } from "lib/input-select/input-select.types";

import { useState } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { InputSelect } from "./input-select";
import { inputSelectProps1 } from "./input-select.mocks";

const InputSelectTemplate = (arguments_: InputSelectProps) => {
  const [inputValue, setInputValue] = useState(arguments_.inputValue || "");
  const [selectValue, setSelectValue] = useState(arguments_.selectValue || "");

  const handleInputChange = (newValue: number | string) => {
    setInputValue(newValue);
  };

  const handleSelectChange = (newValue: string) => {
    setSelectValue(newValue);
  };

  return (
    <InputSelect
      {...arguments_}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSelectChange={handleSelectChange}
      selectValue={selectValue}
    />
  );
};

test("render elements", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = await render(
    <InputSelect {...inputSelectProps1} />
  );
  await expect
    .element(getByLabelText(inputSelectProps1.inputLabel))
    .toBeInTheDocument();
  await expect
    .element(getByLabelText(inputSelectProps1.selectLabel))
    .toBeInTheDocument();
  await expect
    .element(getByText(inputSelectProps1.inputLabel))
    .toBeInTheDocument();
  await expect
    .element(getByText(inputSelectProps1.selectLabel))
    .toBeInTheDocument();
  await expect
    .element(getByTestId(inputSelectProps1.inputId))
    .toBeInTheDocument();
  await expect
    .element(getByTestId(inputSelectProps1.selectId))
    .toBeInTheDocument();
  await expect
    .element(
      getByRole("textbox", {
        name: inputSelectProps1.inputLabel,
      })
    )
    .toBeInTheDocument();
  await expect
    .element(
      getByRole("combobox", {
        name: inputSelectProps1.selectLabel,
      })
    )
    .toBeInTheDocument();
  await Promise.all(
    inputSelectProps1.options.map(async (option) => {
      await expect
        .element(getByRole("option", { name: option.label }))
        .toBeInTheDocument();
    })
  );
});

test("render elements without label", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = await render(
    <InputSelect
      {...inputSelectProps1}
      hideLabel={true}
    />
  );
  await expect
    .element(getByLabelText(inputSelectProps1.inputLabel))
    .toBeInTheDocument();
  await expect
    .element(getByLabelText(inputSelectProps1.selectLabel))
    .toBeInTheDocument();
  await expect
    .element(getByText(inputSelectProps1.inputLabel))
    .toBeInTheDocument();
  await expect
    .element(getByText(inputSelectProps1.selectLabel))
    .toBeInTheDocument();
  await expect
    .element(getByTestId(inputSelectProps1.inputId))
    .toBeInTheDocument();
  await expect
    .element(getByTestId(inputSelectProps1.selectId))
    .toBeInTheDocument();
  await expect
    .element(
      getByRole("textbox", {
        name: inputSelectProps1.inputLabel,
      })
    )
    .toBeInTheDocument();
  await expect
    .element(
      getByRole("combobox", {
        name: inputSelectProps1.selectLabel,
      })
    )
    .toBeInTheDocument();
  await Promise.all(
    inputSelectProps1.options.map(async (option) => {
      await expect
        .element(getByRole("option", { name: option.label }))
        .toBeInTheDocument();
    })
  );
});

test("input value change", async () => {
  const { getByTestId } = await render(
    <InputSelectTemplate {...inputSelectProps1} />
  );
  const inputElement = getByTestId(inputSelectProps1.inputId);
  await inputElement.clear();
  await expect.element(inputElement).toHaveValue("");

  await inputElement.fill("test");
  await expect.element(inputElement).toHaveValue("test");

  await inputElement.fill("1234.456,789!@#+*");
  await expect.element(inputElement).toHaveValue("1234.456,789!@#+*");

  const selectElement = getByTestId(inputSelectProps1.selectId);
  await selectElement.selectOptions(inputSelectProps1.options[1].value);
  await expect
    .element(selectElement)
    .toHaveValue(inputSelectProps1.options[1].value);
});
