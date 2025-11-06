import type { Meta, StoryObj } from "@storybook/react-vite";
import type { InputSelectProps } from "lib/input-select/input-select.types";

import { InputSelect } from "lib/input-select/input-select";
import { inputSelectProps1 } from "lib/input-select/input-select.mocks";
import { useState } from "react";
import { expect } from "storybook/test";

const InputSelectTemplate = (arguments_: InputSelectProps) => {
  const [inputValue, setInputValue] = useState(arguments_.inputValue || "");
  const [selectValue, setSelectValue] = useState(arguments_.selectValue || "");

  const handleInputChange = (newValue: number | string) => {
    setInputValue(newValue);
  };

  const handleSelectChange = (newValue: string) => {
    setSelectValue(newValue);
  };

  return (
    <InputSelect
      {...arguments_}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSelectChange={handleSelectChange}
      selectValue={selectValue}
    />
  );
};

const meta = {
  component: InputSelectTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/InputSelect",
} satisfies Meta<typeof InputSelectTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElementsWithLabel: Story = {
  args: {
    ...inputSelectProps1,
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputSelectProps1.inputLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(inputSelectProps1.selectLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputSelectProps1.inputLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputSelectProps1.selectLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputSelectProps1.inputId)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputSelectProps1.selectId)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputSelectProps1.inputValue)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputSelectProps1.options[0].label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: inputSelectProps1.inputLabel })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("combobox", { name: inputSelectProps1.selectLabel })
    ).toBeInTheDocument();
    for (const option of inputSelectProps1.options) {
      // oxlint-disable-next-line no-await-in-loop
      await expect(
        canvas.getByRole("option", { name: option.label })
      ).toBeInTheDocument();
    }
  },
};

export const TestElementsWithoutLabel: Story = {
  args: {
    ...inputSelectProps1,
    hideLabel: true,
  },
  name: "render elements without label",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputSelectProps1.inputLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(inputSelectProps1.selectLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputSelectProps1.inputLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputSelectProps1.selectLabel)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputSelectProps1.inputId)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputSelectProps1.selectId)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputSelectProps1.inputValue)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputSelectProps1.options[0].label)
    ).toBeInTheDocument();
  },
};

export const TestChangeValue: Story = {
  args: {
    ...inputSelectProps1,
  },
  name: "change value",
  play: async ({ canvas, userEvent }) => {
    // empty value
    await userEvent.clear(canvas.getByTestId(inputSelectProps1.inputId));
    await expect(canvas.getByTestId(inputSelectProps1.inputId)).toHaveValue("");

    // string
    await userEvent.clear(canvas.getByTestId(inputSelectProps1.inputId));
    await userEvent.type(canvas.getByTestId(inputSelectProps1.inputId), "test");
    await expect(canvas.getByTestId(inputSelectProps1.inputId)).toHaveValue(
      "test"
    );

    // email
    await userEvent.clear(canvas.getByTestId(inputSelectProps1.inputId));
    await userEvent.type(
      canvas.getByTestId(inputSelectProps1.inputId),
      "test@example.com"
    );
    await expect(canvas.getByTestId(inputSelectProps1.inputId)).toHaveValue(
      "test@example.com"
    );

    // number
    await userEvent.clear(canvas.getByTestId(inputSelectProps1.inputId));
    await userEvent.type(canvas.getByTestId(inputSelectProps1.inputId), "1234");
    await expect(canvas.getByTestId(inputSelectProps1.inputId)).toHaveValue(
      "1234"
    );

    // special characters
    await userEvent.clear(canvas.getByTestId(inputSelectProps1.inputId));
    await userEvent.type(
      canvas.getByTestId(inputSelectProps1.inputId),
      "1234.456,789!@#+*"
    );
    await expect(canvas.getByTestId(inputSelectProps1.inputId)).toHaveValue(
      "1234.456,789!@#+*"
    );

    await userEvent.selectOptions(
      canvas.getByTestId(inputSelectProps1.selectId),
      inputSelectProps1.options[1].label
    );
    await expect(canvas.getByTestId(inputSelectProps1.selectId)).toHaveValue(
      inputSelectProps1.options[1].value
    );
  },
};
