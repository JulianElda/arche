import type { Meta, StoryObj } from "@storybook/react-vite";

import { Footer } from "./footer";
import { footerProps } from "./footer.mocks";

const meta = {
  component: Footer,
  title: "Footer",
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterLightMode: Story = {
  args: {
    ...footerProps,
  },
  globals: {
    theme: "light",
  },
  name: "Footer",
};
