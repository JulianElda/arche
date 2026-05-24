<script lang="ts">
  import type { SelectFieldProps } from "./select-field.types.ts";

  const {
    id,
    inInputField = false,
    onChange,
    options,
    value,
  }: SelectFieldProps = $props();
</script>

<select
  class={[
    "form-select w-full appearance-none rounded-md border border-ink-gray py-2 pr-8 pl-2 text-ink-black focus:ring-1 focus:ring-primary-300 focus:ring-inset dark:bg-slate dark:text-ink-white",
    inInputField && "h-full rounded-l-none bg-transparent",
    !inInputField && "block pl-3",
  ]}
  data-testid={id}
  {id}
  name={id}
  oninput={(e) => onChange((e.target as HTMLSelectElement).value as string)}
  {value}>
  {#each options as option (option.value)}
    <option value={option.value}>
      {option.label}
    </option>
  {/each}
</select>
