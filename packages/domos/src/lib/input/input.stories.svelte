<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import { inputProps1 } from "./input.mocks.ts";
  import Input from "./input.svelte";

  const { Story } = defineMeta({
    args: {
      onChange: fn(),
      onKeyDown: fn(),
    },
    argTypes: {
      hideLabel: { control: "boolean" },
      id: { control: "text" },
      label: { control: "text" },
      placeholder: { control: "text" },
      value: { control: "boolean" },
    },
    component: Input,
    title: "Input",
  });
</script>

<Story
  name="Default"
  args={{
    ...inputProps1,
  }} />

<Story
  name="Borderless"
  args={{
    ...inputProps1,
    borderless: true,
  }} />
