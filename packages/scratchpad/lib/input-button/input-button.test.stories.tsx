import type { Meta, StoryObj } from "@storybook/react-vite";
import type { InputButtonProperties } from "lib/input-button/input-button.types";

import { InputButton } from "lib/input-button/input-button";
import {
  inputButtonProperties1,
  inputButtonProperties2,
} from "lib/input-button/input-button.mocks";
import { useState } from "react";
import { expect, fn } from "storybook/test";

const InputButtonTemplate = (arguments_: InputButtonProperties) => {
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
    ...inputButtonProperties1,
    onChange: fn(),
  },
  name: "render icon button elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputButtonProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputButtonProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputButtonProperties1.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputButtonProperties1.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputButtonProperties1.id + "-button")
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(inputButtonProperties1.buttonAriaLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: inputButtonProperties1.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", {
        name: inputButtonProperties1.buttonAriaLabel,
      })
    ).toBeInTheDocument();
  },
};

export const TestElements: Story = {
  args: {
    ...inputButtonProperties2,
    onChange: fn(),
  },
  name: "render text button elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputButtonProperties2.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputButtonProperties2.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputButtonProperties2.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputButtonProperties2.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputButtonProperties2.id + "-button")
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(inputButtonProperties2.buttonAriaLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: inputButtonProperties2.label })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", {
        name: inputButtonProperties2.buttonAriaLabel,
      })
    ).toBeInTheDocument();
  },
};

export const TestClickButton: Story = {
  args: {
    ...inputButtonProperties1,
    onButtonClick: fn(),
  },
  name: "click button",
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByTestId(inputButtonProperties1.id + "-button")
    );
    await expect(args.onButtonClick).toHaveBeenCalled();
  },
};
