<script lang="ts">
  const { children } = $props();
</script>

<div
  class="rounded-md bg-card-background-light p-1 shadow-sm
        sm:p-4
        dark:bg-card-background-dark">
  {@render children?.()}
</div>
