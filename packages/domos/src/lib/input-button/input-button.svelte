<script lang="ts">
  import InputField from "$lib/input-field/input-field.svelte";
  import InputLabel from "$lib/input-label/input-label.svelte";

  import type { InputButtonProps } from "./input-button.types.ts";

  const {
    buttonAriaLabel,
    disabled,
    hideLabel,
    icon,
    id,
    label,
    onButtonClick,
    onChange,
    onKeyDown,
    placeholder,
    type,
    value,
  }: InputButtonProps = $props();
</script>

<div class="flex flex-1 flex-col gap-1">
  <InputLabel
    hideLabel={Boolean(hideLabel)}
    {id}
    {label} />
  <div class="relative flex grow items-stretch focus-within:z-10">
    <InputField
      {disabled}
      {id}
      onChange={(value) => onChange?.(value)}
      onKeyDown={(value) => onKeyDown?.(value)}
      {placeholder}
      {type}
      {value}
      withIconLeft={true} />
  </div>
  <button
    aria-label={buttonAriaLabel}
    class="relative -ml-px inline-flex cursor-pointer appearance-none items-center gap-x-1.5 rounded-r-md border border-l-0 border-ink-gray px-3 py-2 text-sm font-bold ring-inset hover:bg-primary-500 hover:text-ink-white focus:border-primary-300 focus:ring-1 focus:ring-primary-300 focus:ring-inset active:bg-primary-700"
    data-testid={id + "-button"}
    onclick={() => onButtonClick()}
    type="button">
    {#if icon}
      {@const Component = icon}
      <Component />
    {/if}
  </button>
</div>
