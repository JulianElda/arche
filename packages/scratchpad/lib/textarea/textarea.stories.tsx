import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextArea } from "./textarea";
import { textAreaProps1, textAreaProps2 } from "./textarea.mocks";

const meta = {
  component: TextArea,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "TextArea",
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaText: Story = {
  args: {
    ...textAreaProps1,
    hideLabel: false,
  },
  name: "Textarea text",
};

export const TextAreaNumber: Story = {
  args: {
    ...textAreaProps2,
    hideLabel: false,
  },
  name: "Textarea number",
};

export const TextAreaHiddenLabel: Story = {
  args: {
    ...textAreaProps1,
    hideLabel: true,
  },
  name: "Textarea hidden label",
};
