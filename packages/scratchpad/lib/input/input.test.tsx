import type { InputProps } from "lib/input/input.types";

import { useState } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Input } from "./input";
import { inputProps1, inputProps2 } from "./input.mocks";

const InputTemplate = (arguments_: InputProps) => {
  const [value, setValue] = useState(arguments_.value || "");

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <Input
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

test("render elements", async () => {
  const {
    getByLabelText,
    getByPlaceholder,
    getByRole,
    getByTestId,
    getByText,
  } = await render(<Input {...inputProps1} />);
  await expect.element(getByLabelText(inputProps1.label)).toBeInTheDocument();
  await expect.element(getByText(inputProps1.label)).toBeInTheDocument();
  await expect.element(getByTestId(inputProps1.id)).toBeInTheDocument();
  await expect
    .element(getByRole("textbox", { name: inputProps1.label }))
    .toBeInTheDocument();
  await expect
    .element(getByPlaceholder(inputProps1.placeholder!))
    .toBeInTheDocument();
});

describe("type=text", () => {
  test("initial value", async () => {
    const { getByTestId } = await render(<InputTemplate {...inputProps1} />);
    const inputElement = getByTestId(inputProps1.id);

    await expect.element(inputElement).toHaveValue(inputProps1.value);
  });

  test("change value", async () => {
    const { getByTestId } = await render(<InputTemplate {...inputProps1} />);
    const inputElement = getByTestId(inputProps1.id);

    await inputElement.clear();
    await expect.element(inputElement).toHaveValue("");

    await inputElement.fill("test");
    await expect.element(inputElement).toHaveValue("test");
    await inputElement.fill("test@example.com");
    await expect.element(inputElement).toHaveValue("test@example.com");
    await inputElement.fill("1234.456,789!@#+*");
    await expect.element(inputElement).toHaveValue("1234.456,789!@#+*");
  });
});

describe("type=number", () => {
  test("initial value", async () => {
    const { getByTestId } = await render(<InputTemplate {...inputProps2} />);
    const inputElement = getByTestId(inputProps2.id);

    await expect.element(inputElement).toHaveValue(inputProps2.value);
  });

  test("change value", async () => {
    const { getByTestId } = await render(<InputTemplate {...inputProps2} />);
    const inputElement = getByTestId(inputProps2.id);

    await inputElement.clear();
    // oxlint-disable-next-line no-null
    await expect.element(inputElement).toHaveValue(null);

    await inputElement.fill("1234");
    await expect.element(inputElement).toHaveValue(1234);

    await inputElement.fill("3.14");
    await expect.element(inputElement).toHaveValue(3.14);

    await inputElement.fill("3.");
    await expect.element(inputElement).toHaveValue(3);
  });
});
