<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "./button.svelte";
  import { fn } from "storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
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
