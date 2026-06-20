<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import { checkboxProps } from "./checkbox.mocks.ts";
  import Checkbox from "./checkbox.svelte";

  const { Story } = defineMeta({
    args: {
      onchange: fn(),
    },
    argTypes: {
      checked: { control: "boolean" },
      hideLabel: { control: "boolean" },
      id: { control: "text" },
      label: { control: "text" },
    },
    component: Checkbox,
    title: "Checkbox",
  });
</script>

<Story
  name="Checked"
  args={{ ...checkboxProps, checked: true }} />

<Story
  name="Unchecked"
  args={{ ...checkboxProps, checked: false }} />

<Story
  name="Hidden Label"
  args={{ ...checkboxProps, hideLabel: true }} />
