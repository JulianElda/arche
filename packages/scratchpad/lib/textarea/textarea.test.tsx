import { useState } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import type { TextAreaProps } from "./textarea.types";

import { TextArea } from "./textarea";
import { textAreaProps1 } from "./textarea.mocks";

const TextAreaTemplate = (arguments_: TextAreaProps) => {
  const {
    disabled,
    hideLabel,
    id,
    label,
    max,
    maxLength,
    min,
    onKeyDown,
    placeholder,
  } = arguments_;
  const [value, setValue] = useState(arguments_.value || "");

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <TextArea
      disabled={disabled}
      hideLabel={hideLabel}
      id={id}
      label={label}
      max={max}
      maxLength={maxLength}
      min={min}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      value={value}
    />
  );
};

test("render elements", async () => {
  const { getByLabelText, getByTestId, getByText } = await render(
    <TextArea
      id={textAreaProps1.id}
      label={textAreaProps1.label}
      value={textAreaProps1.value}
    />,
  );
  await expect
    .element(getByLabelText(textAreaProps1.label))
    .toBeInTheDocument();
  await expect.element(getByText(textAreaProps1.label)).toBeInTheDocument();
  await expect.element(getByTestId(textAreaProps1.id)).toBeInTheDocument();
});

test("initial value", async () => {
  const { getByTestId } = await render(
    <TextArea
      id={textAreaProps1.id}
      label={textAreaProps1.label}
      value={textAreaProps1.value}
    />,
  );
  await expect
    .element(getByTestId(textAreaProps1.id))
    .toHaveValue(textAreaProps1.value);
});

test("change value", async () => {
  const { getByTestId } = await render(
    <TextAreaTemplate
      id={textAreaProps1.id}
      label={textAreaProps1.label}
      value={textAreaProps1.value}
    />,
  );
  const textAreaElement = getByTestId(textAreaProps1.id);

  await textAreaElement.clear();
  await expect.element(textAreaElement).toHaveValue("");

  await textAreaElement.fill("test");
  await expect.element(textAreaElement).toHaveValue("test");

  await textAreaElement.fill("1234.456,789!@#+*");
  await expect.element(textAreaElement).toHaveValue("1234.456,789!@#+*");
});
