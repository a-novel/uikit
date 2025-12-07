<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let { children, ...props }: HTMLAttributes<HTMLElement> = $props();
</script>

<section {...props}>
  {@render children?.()}
</section>

<style>
  section {
    border-width: 0;
    border-color: transparent;
    border-radius: var(--spacing-m);
    background-color: var(--color-gray-200);
    padding: var(--spacing-s) var(--spacing-m);
  }
</style>
