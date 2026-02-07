<script lang="ts">
  import type { InputFieldProps } from "./input-field.types.ts";

  const {
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
    "form-input block w-full appearance-none border border-ink-gray bg-white p-2 px-3 text-ink-black ring-inset focus:border-primary-300 focus:ring-1 focus:ring-primary-300 focus:ring-inset dark:bg-slate dark:text-app-text-dark",
    withIconLeft === true ? "rounded-l-md" : "rounded-md",
  ]} />
