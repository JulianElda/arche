import type { Meta, StoryObj } from "@storybook/react-vite";
import type { InputProperties } from "lib/input/input.types";

import { Input } from "lib/input/input";
import { inputProperties1, inputProperties2 } from "lib/input/input.mocks";
import { useState } from "react";
import { action } from "storybook/actions";
import { expect } from "storybook/test";

const InputTemplate = (arguments_: InputProperties) => {
  const [value, setValue] = useState(arguments_.value || "");

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <Input
      {...arguments_}
      onChange={handleChange}
      value={value}
    />
  );
};

const meta = {
  component: InputTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/Input",
} satisfies Meta<typeof InputTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  args: {
    ...inputProperties1,
    onChange: action("onChange"),
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputProperties1.label)
    ).toBeInTheDocument();
    await expect(canvas.getByText(inputProperties1.label)).toBeInTheDocument();
    await expect(canvas.getByTestId(inputProperties1.id)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputProperties1.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("textbox", { name: inputProperties1.label })
    ).toBeInTheDocument();
  },
};

export const TextInitialValue: Story = {
  args: {
    ...inputProperties1,
    onChange: action("onChange"),
  },
  name: "text: has initial value",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(inputProperties1.id)).toHaveValue(
      inputProperties1.value
    );
  },
};

export const TextChangeValue: Story = {
  args: {
    ...inputProperties1,
    onChange: action("onChange"),
  },
  name: "text: change value",
  play: async ({ canvas, userEvent }) => {
    // empty value
    await userEvent.clear(canvas.getByTestId(inputProperties1.id));
    await expect(canvas.getByTestId(inputProperties1.id)).toHaveValue("");

    // string
    await userEvent.clear(canvas.getByTestId(inputProperties1.id));
    await userEvent.type(canvas.getByTestId(inputProperties1.id), "test");
    await expect(canvas.getByTestId(inputProperties1.id)).toHaveValue("test");

    // email
    await userEvent.clear(canvas.getByTestId(inputProperties1.id));
    await userEvent.type(
      canvas.getByTestId(inputProperties1.id),
      "test@example.com"
    );
    await expect(canvas.getByTestId(inputProperties1.id)).toHaveValue(
      "test@example.com"
    );

    // number
    await userEvent.clear(canvas.getByTestId(inputProperties1.id));
    await userEvent.type(canvas.getByTestId(inputProperties1.id), "1234");
    await expect(canvas.getByTestId(inputProperties1.id)).toHaveValue("1234");

    // special characters
    await userEvent.clear(canvas.getByTestId(inputProperties1.id));
    await userEvent.type(
      canvas.getByTestId(inputProperties1.id),
      "1234.456,789!@#+*"
    );
    await expect(canvas.getByTestId(inputProperties1.id)).toHaveValue(
      "1234.456,789!@#+*"
    );
  },
};

export const NumberHasInitialValue: Story = {
  args: {
    ...inputProperties2,
    onChange: action("onChange"),
  },
  name: "number: has initial value",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(
      inputProperties2.value
    );
  },
};

export const NumberChangeValue: Story = {
  args: {
    ...inputProperties2,
    onChange: action("onChange"),
  },
  name: "number: change value",
  play: async ({ canvas, userEvent }) => {
    // empty value
    await userEvent.clear(canvas.getByTestId(inputProperties2.id));
    // eslint-disable-next-line unicorn/no-null
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(null);

    // number
    await userEvent.clear(canvas.getByTestId(inputProperties2.id));
    await userEvent.type(canvas.getByTestId(inputProperties2.id), "1234");
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(1234);
    // should retain its previous value
    await userEvent.type(canvas.getByTestId(inputProperties2.id), "asdf");
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(1234);

    // string
    await userEvent.clear(canvas.getByTestId(inputProperties2.id));
    await userEvent.type(canvas.getByTestId(inputProperties2.id), "asdf");
    // eslint-disable-next-line unicorn/no-null
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(null);

    // decimal
    await userEvent.clear(canvas.getByTestId(inputProperties2.id));
    await userEvent.type(canvas.getByTestId(inputProperties2.id), "3.14");
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(3.14);

    // incomplete float
    await userEvent.clear(canvas.getByTestId(inputProperties2.id));
    await userEvent.type(canvas.getByTestId(inputProperties2.id), "3.");
    await expect(canvas.getByTestId(inputProperties2.id)).toHaveValue(3);
  },
};
