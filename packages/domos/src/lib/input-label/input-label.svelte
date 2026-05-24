<script lang="ts">
  import type { InputLabelProps } from "./input-label.types.ts";

  const {
    hideLabel = false,
    id,
    label,
    value = "",
  }: InputLabelProps = $props();
</script>

<label
  class={["font-heading mr-auto font-bold", hideLabel && "sr-only"]}
  for={id}>
  {label}
  {#if value !== ""}
    <span class="sr-only">{value}</span>
  {/if}
</label>
