<script lang="ts">
  import InputLabel from "$lib/input-label/input-label.svelte";

  import type { CheckboxProps } from "./checkbox.types.ts";

  const { hideLabel, id, label, onChange, value }: CheckboxProps = $props();
</script>

<div class="relative flex items-start gap-1">
  <div class="flex h-6 items-center">
    <input
      checked={value}
      class="form-checkbox text-primary-500 accent-primary-500 ring-ink-500 focus:border-primary-300 focus:ring-primary-300 dark:bg-ink-500 inline-block size-4 rounded-md border-0 bg-white p-1 ring-1 ring-inset focus:ring-1 focus:ring-inset"
      data-testid={id}
      {id}
      name={id}
      onchange={(event) => onChange((event.target as HTMLInputElement).checked)}
      type="checkbox" />
  </div>
  <div class="leading-6">
    <InputLabel
      hideLabel={Boolean(hideLabel)}
      {id}
      {label} />
  </div>
</div>
