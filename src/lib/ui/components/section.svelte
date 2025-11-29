<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let { children, ...props }: HTMLAttributes<HTMLElement> = $props();
</script>

<section {...props}>
  {@render children?.()}
</section>

<style>
  section {
    background-color: var(--color-gray-200);
    border-color: transparent;
    border-width: 0;
    border-radius: var(--spacing-s);
    padding: var(--spacing-s) var(--spacing-m);
  }
</style>
