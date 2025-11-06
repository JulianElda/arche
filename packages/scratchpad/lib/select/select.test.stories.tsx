import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SelectProps } from "lib/select/select.types";

import { useState } from "react";
import { expect } from "storybook/test";

import { Select } from "./select";
import { selectProps1 } from "./select.mocks";

const SelectTemplate = (arguments_: SelectProps) => {
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
    ...selectProps1,
  },
  name: "render elements with label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProps1.id)).toBeInTheDocument();
    await expect(canvas.getByLabelText(selectProps1.label)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: selectProps1.label })
    ).toBeInTheDocument();
    for (const option of selectProps1.options) {
      // oxlint-disable-next-line no-await-in-loop
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    }
  },
};

export const TestElementsWithoutLabel: Story = {
  args: {
    ...selectProps1,
    hideLabel: true,
  },
  name: "render elements without label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProps1.id)).toBeInTheDocument();
    await expect(canvas.getByLabelText(selectProps1.label)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: selectProps1.label })
    ).toBeInTheDocument();
    for (const option of selectProps1.options) {
      // oxlint-disable-next-line no-await-in-loop
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    }
  },
};

export const TestInitialValue: Story = {
  args: {
    ...selectProps1,
  },
  name: "has initial value",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProps1.id)).toHaveValue(
      selectProps1.value
    );
  },
};

export const TestChangeValue: Story = {
  args: {
    ...selectProps1,
  },
  name: "change value",
  play: async ({ canvas, userEvent }) => {
    await userEvent.selectOptions(
      canvas.getByTestId(selectProps1.id),
      selectProps1.options[1].label
    );
    await expect(canvas.getByTestId(selectProps1.id)).toHaveValue(
      selectProps1.options[1].value
    );
  },
};
