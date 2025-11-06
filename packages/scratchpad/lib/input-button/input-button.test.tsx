import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { InputButton } from "./input-button";
import { inputButtonProps1, inputButtonProps2 } from "./input-button.mocks";

test("render icon button elements", async () => {
  const { getByLabelText, getByTestId, getByText } = await render(
    <InputButton {...inputButtonProps1} />
  );
  await expect
    .element(getByLabelText(inputButtonProps1.label))
    .toBeInTheDocument();
  await expect.element(getByText(inputButtonProps1.label)).toBeInTheDocument();
  await expect.element(getByTestId(inputButtonProps1.id)).toBeInTheDocument();
  await expect
    .element(getByTestId(inputButtonProps1.id + "-button"))
    .toBeInTheDocument();
});

test("render text button elements", async () => {
  const { getByLabelText, getByTestId, getByText } = await render(
    <InputButton {...inputButtonProps2} />
  );
  await expect
    .element(getByLabelText(inputButtonProps2.label))
    .toBeInTheDocument();
  await expect.element(getByText(inputButtonProps2.label)).toBeInTheDocument();
  await expect.element(getByTestId(inputButtonProps2.id)).toBeInTheDocument();
  await expect
    .element(getByTestId(inputButtonProps2.id + "-button"))
    .toBeInTheDocument();
  await expect
    .element(getByLabelText(inputButtonProps2.buttonAriaLabel))
    .toBeInTheDocument();
});

test("button click triggers onButtonClick", async () => {
  const mockOnButtonClick = vi.fn();
  const { getByTestId } = await render(
    <InputButton
      {...inputButtonProps1}
      onButtonClick={mockOnButtonClick}
    />
  );
  const buttonElement = getByTestId(inputButtonProps1.id + "-button");

  await buttonElement.click();
  expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
});

test("input change triggers onChange", async () => {
  const mockOnChange = vi.fn();
  const { getByTestId } = await render(
    <InputButton
      {...inputButtonProps2}
      onChange={mockOnChange}
    />
  );
  const inputElement = getByTestId(inputButtonProps2.id);

  await inputElement.fill("test");
  expect(mockOnChange).toHaveBeenCalledTimes(1);
});
