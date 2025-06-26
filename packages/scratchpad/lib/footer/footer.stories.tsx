import type { Meta, StoryObj } from "@storybook/react-vite";

import { Footer } from "./footer";
import { footerProperties } from "./footer.mocks";

const meta = {
  component: Footer,
  title: "Footer",
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterLightMode: Story = {
  args: {
    ...footerProperties,
  },
  globals: {
    theme: "light",
  },
  name: "Footer",
};
