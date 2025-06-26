import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SelectProperties } from "lib/select/select.types";

import { useState } from "react";
import { expect } from "storybook/test";

import { Select } from "./select";
import { selectProperties1 } from "./select.mocks";

const SelectTemplate = (arguments_: SelectProperties) => {
  const [value, setValue] = useState(arguments_.value ?? "");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

const meta = {
  component: SelectTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Tests/Select",
} satisfies Meta<typeof SelectTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  args: {
    ...selectProperties1,
  },
  name: "render elements with label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProperties1.id)).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(selectProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(selectProperties1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: selectProperties1.label })
    ).toBeInTheDocument();
    for (const option of selectProperties1.options) {
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    }
  },
};

export const TestElementsWithoutLabel: Story = {
  args: {
    ...selectProperties1,
    hideLabel: true,
  },
  name: "render elements without label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProperties1.id)).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(selectProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(selectProperties1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: selectProperties1.label })
    ).toBeInTheDocument();
    for (const option of selectProperties1.options) {
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    }
  },
};

export const TestInitialValue: Story = {
  args: {
    ...selectProperties1,
  },
  name: "has initial value",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProperties1.id)).toHaveValue(
      selectProperties1.value
    );
  },
};

export const TestChangeValue: Story = {
  args: {
    ...selectProperties1,
  },
  name: "change value",
  play: async ({ canvas, userEvent }) => {
    await userEvent.selectOptions(
      canvas.getByTestId(selectProperties1.id),
      selectProperties1.options[1].label
    );
    await expect(canvas.getByTestId(selectProperties1.id)).toHaveValue(
      selectProperties1.options[1].value
    );
  },
};
