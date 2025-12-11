<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    title?: string;
    mobile?: boolean;
  }

  let { children, class: className, title, mobile, ...props }: Props = $props();
</script>

{#if mobile && title}
  <h6>{title}</h6>
{/if}
<div {...props} class={["container", className]} data-mobile={mobile}>
  {@render children?.()}
</div>

<style>
  .container {
    display: flex;
    gap: var(--spacing-s);

    &[data-mobile="true"] {
      flex-direction: column;
      align-items: stretch;
      padding: 0 var(--spacing-m);
    }

    &:not([data-mobile="true"]) {
      flex-direction: row;
      align-items: center;
      padding: 0 0 0 var(--spacing-m);
    }
  }
</style>
