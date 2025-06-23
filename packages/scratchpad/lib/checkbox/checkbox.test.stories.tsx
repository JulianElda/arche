import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxProps } from "lib/checkbox/checkbox.types";
import { useState } from "react";
import { expect } from "storybook/test";
import { Checkbox } from "./checkbox";
import { checkboxProps } from "./checkbox.mocks";

const CheckboxTemplate = (args: CheckboxProps) => {
  const [value, setValue] = useState<boolean>(args.value ?? true);

  const handleChange = (newVal: boolean) => {
    setValue(newVal);
  };

  return (
    <Checkbox
      {...args}
      value={value}
      onChange={handleChange}
    />
  );
};

const meta = {
  title: "Tests/Checkbox",
  component: CheckboxTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  name: "render elements",
  args: {
    ...checkboxProps,
  },
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
  name: "render elements with hidden label",
  args: {
    ...checkboxProps,
    hideLabel: true,
  },
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
  name: "initial value checked",
  args: {
    ...checkboxProps,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProps.id)).toBeChecked();
  },
};

export const CheckboxInitialNotChecked: Story = {
  name: "initial value not checked",
  args: {
    ...checkboxProps,
    value: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProps.id)).not.toBeChecked();
  },
};

export const CheckboxChangeValue: Story = {
  name: "change value",
  args: {
    ...checkboxProps,
  },
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
