import type { Meta, StoryObj } from "@storybook/react";
import { FooterWithTheme } from "./FooterWithTheme";
import { footerProps } from "./../footer/footer.mocks";

const meta = {
  title: "FooterWithTheme",
  component: FooterWithTheme,
  decorators: [
    (Story) => (
      <div className="h-48 max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FooterWithTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterLightMode: Story = {
  name: "FooterWithTheme light mode",
  args: {
    ...footerProps,
    darkTheme: false,
  },
};

export const FooterDarkMode: Story = {
  name: "FooterWithTheme dark mode",
  args: {
    ...footerProps,
    darkTheme: true,
  },
};
