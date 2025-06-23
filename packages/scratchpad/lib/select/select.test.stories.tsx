import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Select } from "./select";
import { selectProps1 } from "./select.mocks";
import { useState } from "react";
import { SelectProps } from "lib/select/select.types";
import userEvent from "@testing-library/user-event";

const SelectTemplate = (args: SelectProps) => {
  const [value, setValue] = useState(args.value ?? "");

  const handleChange = (newVal: string) => {
    setValue(newVal);
  };

  return (
    <Select
      {...args}
      value={value}
      onChange={handleChange}
    />
  );
};

const meta = {
  title: "Tests/Select",
  component: SelectTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  name: "render elements with label",
  args: {
    ...selectProps1,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProps1.id)).toBeInTheDocument();
    await expect(canvas.getByLabelText(selectProps1.label)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: selectProps1.label })
    ).toBeInTheDocument();
    selectProps1.options.forEach(async (option) => {
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    });
  },
};

export const TestElementsWithoutLabel: Story = {
  name: "render elements without label",
  args: {
    ...selectProps1,
    hideLabel: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProps1.id)).toBeInTheDocument();
    await expect(canvas.getByLabelText(selectProps1.label)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: selectProps1.label })
    ).toBeInTheDocument();
    selectProps1.options.forEach(async (option) => {
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    });
  },
};

export const TestInitialValue: Story = {
  name: "has initial value",
  args: {
    ...selectProps1,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(selectProps1.id)).toHaveValue(
      selectProps1.value
    );
  },
};

export const TestChangeValue: Story = {
  name: "change value",
  args: {
    ...selectProps1,
  },
  play: async ({ canvas }) => {
    await userEvent.selectOptions(
      canvas.getByTestId(selectProps1.id),
      selectProps1.options[1].label
    );
    await expect(canvas.getByTestId(selectProps1.id)).toHaveValue(
      selectProps1.options[1].value
    );
  },
};
