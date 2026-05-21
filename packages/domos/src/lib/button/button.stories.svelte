<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import { buttonPropsPrimary, buttonPropsSecondary } from "./button.mocks.ts";
  import Button from "./button.svelte";

  const { Story } = defineMeta({
    args: {
      onclick: fn(),
    },
    argTypes: {
      id: { control: "text" },
      style: {
        control: { type: "select" },
        options: ["primary", "secondary"],
      },
      text: { control: "text" },
      type: {
        control: { type: "select" },
        options: ["button", "submit"],
      },
    },
    component: Button,
    title: "Button",
  });
</script>

<Story
  name="Primary"
  args={buttonPropsPrimary} />

<Story
  name="Secondary"
  args={buttonPropsSecondary} />
