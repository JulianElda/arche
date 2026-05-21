<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import Input from "./input.svelte";

  const { Story } = defineMeta({
    args: {
      onChange: fn(),
    },
    argTypes: {
      hideLabel: { control: "boolean" },
      id: { control: "text" },
      label: { control: "text" },
      value: { control: "boolean" },
    },
    component: Input,
    title: "Input",
  });
</script>

<Story
  name="Default"
  args={{
    id: "input-id-1",
    type: "text",
    label: "Input Label",
    value: "Input Value",
    placeholder: "Placeholder Text",
  }} />

<Story
  name="Borderless"
  args={{
    id: "input-id-1",
    type: "text",
    label: "Input Label",
    value: "Input Value",
    placeholder: "Placeholder Text",
    borderless: true,
    hideLabel: true,
  }} />
