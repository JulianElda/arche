import type { Meta, StoryObj } from "@storybook/react-vite";

import { Footer } from "./footer";
import { footerProperties } from "./footer.mocks";

const meta = {
  component: Footer,
  decorators: [
    (Story) => (
      <div className="h-48 max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Footer",
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterStandard: Story = {
  args: {
    ...footerProperties,
  },
  name: "Footer",
};
