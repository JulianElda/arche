import type { Meta, StoryObj } from "@storybook/react-vite";
import type { InputButtonProps } from "lib/input-button/input-button.types";

import { InputButton } from "lib/input-button/input-button";
import {
  inputButtonProps1,
  inputButtonProps2,
} from "lib/input-button/input-button.mocks";
import { useState } from "react";
import { expect, fn } from "storybook/test";

const InputButtonTemplate = (arguments_: InputButtonProps) => {
  const [value, setValue] = useState(arguments_.value || "");

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <InputButton
      {...arguments_}
      onButtonClick={arguments_.onButtonClick}
      onChange={handleChange}
      value={value}
    />
  );
};

const meta = {
  component: InputButtonTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/InputButton",
} satisfies Meta<typeof InputButtonTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestIconButtonElements: Story = {
  args: {
    ...inputButtonProps1,
    onChange: fn(),
  },
  name: "render icon button elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputButtonProps1.label)
    ).toBeInTheDocument();
    await expect(canvas.getByText(inputButtonProps1.label)).toBeInTheDocument();
    await expect(canvas.getByTestId(inputButtonProps1.id)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputButtonProps1.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputButtonProps1.id + "-button")
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(inputButtonProps1.buttonAriaLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: inputButtonProps1.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", {
        name: inputButtonProps1.buttonAriaLabel,
      })
    ).toBeInTheDocument();
  },
};

export const TestElements: Story = {
  args: {
    ...inputButtonProps2,
    onChange: fn(),
  },
  name: "render text button elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputButtonProps2.label)
    ).toBeInTheDocument();
    await expect(canvas.getByText(inputButtonProps2.label)).toBeInTheDocument();
    await expect(canvas.getByTestId(inputButtonProps2.id)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputButtonProps2.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputButtonProps2.id + "-button")
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(inputButtonProps2.buttonAriaLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: inputButtonProps2.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", {
        name: inputButtonProps2.buttonAriaLabel,
      })
    ).toBeInTheDocument();
  },
};

export const TestClickButton: Story = {
  args: {
    ...inputButtonProps1,
    onButtonClick: fn(),
  },
  name: "click button",
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId(inputButtonProps1.id + "-button"));
    await expect(args.onButtonClick).toHaveBeenCalled();
  },
};
