import type { TextAreaProps } from "lib/textarea/textarea.types";

import { useState } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { TextArea } from "./textarea";
import { textAreaProps1 } from "./textarea.mocks";

const TextAreaTemplate = (arguments_: TextAreaProps) => {
  const [value, setValue] = useState(arguments_.value || "");

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <TextArea
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

test("render elements", async () => {
  const { getByLabelText, getByTestId, getByText } = await render(
    <TextArea {...textAreaProps1} />
  );
  await expect
    .element(getByLabelText(textAreaProps1.label))
    .toBeInTheDocument();
  await expect.element(getByText(textAreaProps1.label)).toBeInTheDocument();
  await expect.element(getByTestId(textAreaProps1.id)).toBeInTheDocument();
});

test("initial value", async () => {
  const { getByTestId } = await render(<TextArea {...textAreaProps1} />);
  await expect
    .element(getByTestId(textAreaProps1.id))
    .toHaveValue(textAreaProps1.value);
});

test("change value", async () => {
  const { getByTestId } = await render(
    <TextAreaTemplate {...textAreaProps1} />
  );
  const textAreaElement = getByTestId(textAreaProps1.id);

  await textAreaElement.clear();
  await expect.element(textAreaElement).toHaveValue("");

  await textAreaElement.fill("test");
  await expect.element(textAreaElement).toHaveValue("test");

  await textAreaElement.fill("1234.456,789!@#+*");
  await expect.element(textAreaElement).toHaveValue("1234.456,789!@#+*");
});
