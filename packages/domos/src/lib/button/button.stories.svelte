<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import Button from "./button.svelte";

  const { Story } = defineMeta({
    title: "Button",
    component: Button,
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
    args: {
      onclick: fn(),
    },
  });
</script>

<Story
  name="Primary"
  args={{
    id: "button",
    style: "primary",
    text: "Button primary",
    type: "button",
  }} />

<Story
  name="Secondary"
  args={{
    id: "button",
    style: "secondary",
    text: "Button secondary",
    type: "button",
  }} />
