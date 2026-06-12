import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { InputButton } from "./input-button";
import { inputButtonProps1, inputButtonProps2 } from "./input-button.mocks";

test("render icon button elements", async () => {
  const { getByLabelText, getByTestId, getByText } = await render(
    <InputButton
      buttonAriaLabel={inputButtonProps1.buttonAriaLabel}
      icon={inputButtonProps1.icon}
      id={inputButtonProps1.id}
      label={inputButtonProps1.label}
      onButtonClick={inputButtonProps1.onButtonClick}
      placeholder={inputButtonProps1.placeholder}
      type={inputButtonProps1.type}
      value={inputButtonProps1.value}
    />,
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
    <InputButton
      buttonAriaLabel={inputButtonProps2.buttonAriaLabel}
      icon={inputButtonProps2.icon}
      id={inputButtonProps2.id}
      label={inputButtonProps2.label}
      onButtonClick={inputButtonProps2.onButtonClick}
      placeholder={inputButtonProps2.placeholder}
      type={inputButtonProps2.type}
      value={inputButtonProps2.value}
    />,
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
  const mockOnButtonClick = vi.fn<() => void>();
  const { getByTestId } = await render(
    <InputButton
      buttonAriaLabel={inputButtonProps1.buttonAriaLabel}
      icon={inputButtonProps1.icon}
      id={inputButtonProps1.id}
      label={inputButtonProps1.label}
      onButtonClick={mockOnButtonClick}
      placeholder={inputButtonProps1.placeholder}
      type={inputButtonProps1.type}
      value={inputButtonProps1.value}
    />,
  );
  const buttonElement = getByTestId(inputButtonProps1.id + "-button");

  await buttonElement.click();
  expect(mockOnButtonClick).toHaveBeenCalledOnce();
});

test("input change triggers onChange", async () => {
  const mockOnChange = vi.fn<(value: number | string) => void>();
  const { getByTestId } = await render(
    <InputButton
      buttonAriaLabel={inputButtonProps2.buttonAriaLabel}
      icon={inputButtonProps2.icon}
      id={inputButtonProps2.id}
      label={inputButtonProps2.label}
      onButtonClick={inputButtonProps2.onButtonClick}
      onChange={mockOnChange}
      placeholder={inputButtonProps2.placeholder}
      type={inputButtonProps2.type}
      value={inputButtonProps2.value}
    />,
  );
  const inputElement = getByTestId(inputButtonProps2.id);

  await inputElement.fill("test");
  expect(mockOnChange).toHaveBeenCalledOnce();
});
