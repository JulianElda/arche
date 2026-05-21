<script lang="ts">
  import type { ButtonProps } from "./button.types.ts";

  const {
    id,
    onClick,
    style = "primary",
    text,
    type = "button",
  }: ButtonProps = $props();
</script>

<button
  data-testid={id}
  {id}
  onclick={onClick}
  {type}
  class={[
    "hover:border-primary-500 hover:bg-primary-500 focus:ring-primary-300 focus-visible:outline-primary-300 active:bg-primary-700 dark:hover:bg-primary-500 cursor-pointer appearance-none rounded-lg p-2 text-lg shadow-sm focus-visible:outline focus-visible:outline-offset-2",
    style === "primary"
      ? "border-primary-700 bg-primary-700 text-ink-white "
      : "border-ink-500 bg-card-background-light text-ink-black dark:bg-slate dark:text-ink-white border hover:text-white",
  ]}>
  {text}
</button>
