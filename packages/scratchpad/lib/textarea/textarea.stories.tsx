import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./textarea";
import { textAreaProps1, textAreaProps2 } from "./textarea.mocks";

const meta = {
  title: "TextArea",
  component: TextArea,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaText: Story = {
  name: "Textarea text",
  args: {
    ...textAreaProps1,
    hideLabel: false,
  },
};

export const TextAreaNumber: Story = {
  name: "Textarea number",
  args: {
    ...textAreaProps2,
    hideLabel: false,
  },
};

export const TextAreaHiddenLabel: Story = {
  name: "Textarea hidden label",
  args: {
    ...textAreaProps1,
    hideLabel: true,
  },
};
