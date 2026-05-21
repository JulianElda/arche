<script lang="ts">
  import type { InputFieldProps } from "./input-field.types.ts";

  const {
    borderless = false,
    disabled = false,
    id,
    onChange,
    onKeyDown,
    placeholder = "",
    type = "text",
    value,
    withIconLeft = false,
  }: InputFieldProps = $props();
</script>

<input
  data-testid={id}
  {id}
  {disabled}
  oninput={(e) => onChange?.((e.target as HTMLInputElement).value)}
  onkeydown={(e) => onKeyDown?.((e.target as HTMLInputElement).value)}
  {placeholder}
  {type}
  {value}
  class={[
    "form-input text-ink-black dark:bg-slate dark:text-app-text-dark block w-full appearance-none border bg-white",
    borderless === true
      ? "border-0 p-0 ring-0 outline-none focus:ring-0 focus:outline-none"
      : "border-ink-gray focus:border-primary-300 focus:ring-primary-300 p-2 px-3 ring-inset focus:ring-1 focus:ring-inset",
    withIconLeft === true ? "rounded-l-md" : "rounded-md",
  ]} />
