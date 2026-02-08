<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import Checkbox from "./checkbox.svelte";

  const { Story } = defineMeta({
    title: "Checkbox",
    component: Checkbox,
    argTypes: {
      id: { control: "text" },
      label: { control: "text" },
      value: { control: "boolean" },
      hideLabel: { control: "boolean" },
    },
    args: {
      onChange: fn(),
    },
  });
</script>

<Story
  name="Checked"
  args={{
    id: "checkbox-checked",
    label: "Checked Checkbox",
    value: true,
  }} />

<Story
  name="Unchecked"
  args={{
    id: "checkbox-unchecked",
    label: "Unchecked Checkbox",
    value: false,
  }} />

<Story
  name="Hidden Label"
  args={{
    id: "checkbox-hidden-label",
    label: "Hidden Label Checkbox",
    value: false,
    hideLabel: true,
  }} />
