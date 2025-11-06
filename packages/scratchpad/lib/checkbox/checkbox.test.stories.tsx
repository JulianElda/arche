import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CheckboxProps } from "lib/checkbox/checkbox.types";

import { useState } from "react";
import { expect } from "storybook/test";

import { Checkbox } from "./checkbox";
import { checkboxProps } from "./checkbox.mocks";

const CheckboxTemplate = (arguments_: CheckboxProps) => {
  const [value, setValue] = useState<boolean>(arguments_.value ?? true);

  const handleChange = (newValue: boolean) => {
    setValue(newValue);
  };

  return (
    <Checkbox
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

const meta = {
  component: CheckboxTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  args: {
    ...checkboxProps,
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProps.id)).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(checkboxProps.label)
    ).toBeInTheDocument();
    await expect(canvas.getByText(checkboxProps.label)).toBeInTheDocument();
    await expect(
      canvas.getByRole("checkbox", { name: checkboxProps.label })
    ).toBeInTheDocument();
  },
};

export const TestElementsWithoutLabel: Story = {
  args: {
    ...checkboxProps,
    hideLabel: true,
  },
  name: "render elements with hidden label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProps.id)).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(checkboxProps.label)
    ).toBeInTheDocument();
    await expect(canvas.getByText(checkboxProps.label)).toBeInTheDocument();
    await expect(
      canvas.getByRole("checkbox", { name: checkboxProps.label })
    ).toBeInTheDocument();
  },
};

export const CheckboxInitialChecked: Story = {
  args: {
    ...checkboxProps,
  },
  name: "initial value checked",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProps.id)).toBeChecked();
  },
};

export const CheckboxInitialNotChecked: Story = {
  args: {
    ...checkboxProps,
    value: false,
  },
  name: "initial value not checked",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProps.id)).not.toBeChecked();
  },
};

export const CheckboxChangeValue: Story = {
  args: {
    ...checkboxProps,
  },
  name: "change value",
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId(checkboxProps.id));
    await expect(canvas.getByTestId(checkboxProps.id)).not.toBeChecked();
    await userEvent.click(canvas.getByTestId(checkboxProps.id));
    await expect(canvas.getByTestId(checkboxProps.id)).toBeChecked();

    // click on the label
    await userEvent.click(canvas.getByText(checkboxProps.label));
    await expect(canvas.getByTestId(checkboxProps.id)).not.toBeChecked();
  },
};
