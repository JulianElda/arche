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
      variant: {
        control: { type: "select" },
        options: ["primary", "secondary"],
      },
    },
    component: Button,
    title: "Button",
  });
</script>

{#snippet children()}
  Button
{/snippet}

<Story
  name="Primary"
  args={{ buttonPropsPrimary, children }}>
</Story>

<Story
  name="Secondary"
  args={{ buttonPropsSecondary, children }}>
</Story>
