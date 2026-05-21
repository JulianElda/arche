<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Card from "./card.svelte";

  const { Story } = defineMeta({
    component: Card,
    title: "Card",
  });
</script>

<Story name="Default">
  <h2 class="text-lg font-semibold">Card Title</h2>
  <p class="text-sm text-gray-500">This is a card description.</p>
</Story>
