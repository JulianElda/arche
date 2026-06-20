<script lang="ts">
  import type { SelectFieldProps } from "./select-field.types.ts";

  const {
    borderless = false,
    inInputField = false,
    options,
    ...rest
  }: SelectFieldProps = $props();
</script>

<select
  {...rest}
  class={[
    "form-select w-full appearance-none rounded-md text-ink-black dark:bg-slate dark:text-ink-white",
    borderless === true
      ? "border-0 bg-transparent p-0 ring-0 outline-none focus:ring-0 focus:outline-none"
      : "border border-ink-gray py-2 pr-8 pl-2 focus:ring-1 focus:ring-primary-300 focus:ring-inset",
    inInputField === true
      ? "h-full rounded-l-none bg-transparent"
      : "block pl-3",
  ]}>
  {#each options as option (option.value)}
    <option value={option.value}>
      {option.label}
    </option>
  {/each}
</select>
