import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";
import { footerProps } from "./footer.mocks";

const meta = {
  title: "Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <div className="h-48 max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterLightMode: Story = {
  name: "Footer light mode",
  args: {
    ...footerProps,
    darkTheme: false,
  },
};

export const FooterDarkMode: Story = {
  name: "Footer dark mode",
  args: {
    ...footerProps,
    darkTheme: true,
  },
};
