import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TextAreaProperties } from "lib/textarea/textarea.types";

import { useState } from "react";
import { action } from "storybook/actions";
import { expect } from "storybook/test";

import { TextArea } from "./textarea";
import { textAreaProperties1 } from "./textarea.mocks";

const TextAreaTemplate = (arguments_: TextAreaProperties) => {
  const [value, setValue] = useState(arguments_.value || "");

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <TextArea
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

const meta = {
  component: TextAreaTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/TextArea",
} satisfies Meta<typeof TextAreaTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  args: {
    ...textAreaProperties1,
    onChange: action("onChange"),
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(textAreaProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(textAreaProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(textAreaProperties1.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(textAreaProperties1.value)
    ).toBeInTheDocument();
  },
};

export const TextChangeValue: Story = {
  args: {
    ...textAreaProperties1,
    onChange: action("onChange"),
  },
  name: "change value",
  play: async ({ canvas, userEvent }) => {
    // empty value
    await userEvent.clear(canvas.getByTestId(textAreaProperties1.id));
    await expect(canvas.getByTestId(textAreaProperties1.id)).toHaveValue("");

    // string
    await userEvent.clear(canvas.getByTestId(textAreaProperties1.id));
    await userEvent.type(canvas.getByTestId(textAreaProperties1.id), "test");
    await expect(canvas.getByTestId(textAreaProperties1.id)).toHaveValue(
      "test"
    );

    // email
    await userEvent.clear(canvas.getByTestId(textAreaProperties1.id));
    await userEvent.type(
      canvas.getByTestId(textAreaProperties1.id),
      "test@example.com"
    );
    await expect(canvas.getByTestId(textAreaProperties1.id)).toHaveValue(
      "test@example.com"
    );

    // number
    await userEvent.clear(canvas.getByTestId(textAreaProperties1.id));
    await userEvent.type(canvas.getByTestId(textAreaProperties1.id), "1234");
    await expect(canvas.getByTestId(textAreaProperties1.id)).toHaveValue(
      "1234"
    );

    // special characters
    await userEvent.clear(canvas.getByTestId(textAreaProperties1.id));
    await userEvent.type(
      canvas.getByTestId(textAreaProperties1.id),
      "1234.456,789!@#+*"
    );
    await expect(canvas.getByTestId(textAreaProperties1.id)).toHaveValue(
      "1234.456,789!@#+*"
    );
  },
};
