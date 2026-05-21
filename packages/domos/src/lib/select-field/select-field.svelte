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
    "form-select border-ink-gray text-ink-black focus:ring-primary-300 dark:bg-slate dark:text-ink-white w-full appearance-none rounded-md border py-2 pr-8 pl-2 focus:ring-1 focus:ring-inset",
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
