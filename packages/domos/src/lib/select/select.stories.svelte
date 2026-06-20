<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import { selectProps1, selectProps2 } from "./select.mocks.ts";
  import Select from "./select.svelte";

  const { Story } = defineMeta({
    args: {
      onchange: fn(),
    },
    argTypes: {
      disabled: { control: "boolean" },
      hideLabel: { control: "boolean" },
      id: { control: "text" },
      label: { control: "text" },
    },
    component: Select,
    title: "Select",
  });
</script>

<Story
  name="Select with long labels"
  args={{ ...selectProps1, hideLabel: false }} />

<Story
  name="Select with short labels"
  args={{ ...selectProps2, hideLabel: false }} />

<Story
  name="Select without label"
  args={{ ...selectProps1, hideLabel: true }} />

<Story
  name="Borderless"
  args={{ ...selectProps1, borderless: true, hideLabel: true }} />

<Story
  name="Disabled"
  args={{ ...selectProps1, hideLabel: false, disabled: true }} />
