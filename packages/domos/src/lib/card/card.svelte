<script lang="ts">
  import { clsx } from "clsx";
  import { twMerge } from "tailwind-merge";

  import type { CardProps } from "./card.types.ts";

  const { children, class: className, ...rest }: CardProps = $props();
</script>

<div
  {...rest}
  class={twMerge(
    "rounded-md bg-card-background-light p-1 shadow-sm sm:p-4 dark:bg-card-background-dark",
    clsx(className),
  )}>
  {@render children?.()}
</div>
