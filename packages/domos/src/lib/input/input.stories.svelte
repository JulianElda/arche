<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import { inputProps1, inputProps2, inputProps3 } from "./input.mocks.ts";
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
      value: { control: "text" },
    },
    component: Input,
    title: "Input",
  });
</script>

<Story
  name="Input type text"
  args={{
    ...inputProps1,
    hideLabel: false,
  }} />

<Story
  name="Input type number"
  args={{
    ...inputProps2,
    hideLabel: false,
  }} />

<Story
  name="Input type search"
  args={{
    ...inputProps3,
    hideLabel: false,
  }} />

<Story
  name="Input without label"
  args={{
    ...inputProps1,
    hideLabel: true,
  }} />

<Story
  name="Input with placeholder"
  args={{
    ...inputProps1,
    hideLabel: false,
    placeholder: "Type here",
    value: "",
  }} />

<Story
  name="Borderless"
  args={{
    ...inputProps1,
    borderless: true,
  }} />
