import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CheckboxProperties } from "lib/checkbox/checkbox.types";

import { useState } from "react";
import { expect } from "storybook/test";

import { Checkbox } from "./checkbox";
import { checkboxProperties } from "./checkbox.mocks";

const CheckboxTemplate = (arguments_: CheckboxProperties) => {
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
    ...checkboxProperties,
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProperties.id)).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(checkboxProperties.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(checkboxProperties.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("checkbox", { name: checkboxProperties.label })
    ).toBeInTheDocument();
  },
};

export const TestElementsWithoutLabel: Story = {
  args: {
    ...checkboxProperties,
    hideLabel: true,
  },
  name: "render elements with hidden label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProperties.id)).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(checkboxProperties.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(checkboxProperties.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("checkbox", { name: checkboxProperties.label })
    ).toBeInTheDocument();
  },
};

export const CheckboxInitialChecked: Story = {
  args: {
    ...checkboxProperties,
  },
  name: "initial value checked",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProperties.id)).toBeChecked();
  },
};

export const CheckboxInitialNotChecked: Story = {
  args: {
    ...checkboxProperties,
    value: false,
  },
  name: "initial value not checked",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(checkboxProperties.id)).not.toBeChecked();
  },
};

export const CheckboxChangeValue: Story = {
  args: {
    ...checkboxProperties,
  },
  name: "change value",
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId(checkboxProperties.id));
    await expect(canvas.getByTestId(checkboxProperties.id)).not.toBeChecked();
    await userEvent.click(canvas.getByTestId(checkboxProperties.id));
    await expect(canvas.getByTestId(checkboxProperties.id)).toBeChecked();

    // click on the label
    await userEvent.click(canvas.getByText(checkboxProperties.label));
    await expect(canvas.getByTestId(checkboxProperties.id)).not.toBeChecked();
  },
};
