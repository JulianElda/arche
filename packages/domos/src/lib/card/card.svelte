<script lang="ts">
  const { children } = $props();
</script>

<div
  class="bg-card-background-light dark:bg-card-background-dark rounded-md p-1 shadow-sm sm:p-4">
  {@render children?.()}
</div>
