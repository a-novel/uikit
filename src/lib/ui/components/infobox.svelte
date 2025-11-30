<script lang="ts">
  import { ComponentColor } from "$lib/ui/index.js";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    color?: z.infer<typeof ComponentColor>;
    icon?: Snippet;
  }

  const { children, color = "default", icon, class: className, ...props }: Props = $props();
</script>

<div {...props} class={["box", className]} data-color={color}>
  {@render children?.()}
  <div class="icon">
    {@render icon?.()}
  </div>
</div>

<style>
  .box {
    border-radius: var(--spacing-s);
    border-width: thin;
    border-style: solid;
    border-color: var(--color-400);
    background-color: var(--color-100);
    padding: var(--spacing-xs) var(--spacing-s);
    color: var(--color-500);
    position: relative;
    font-size: var(--font-size-p);
    overflow: hidden;
  }

  .icon {
    position: absolute;
    top: 50%;
    right: var(--spacing-s);
    color: inherit;
    transform-origin: center;
    transform: translateY(-50%);
    opacity: 0.3;
    user-select: none;
    line-height: 4em;
    font-size: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
  }

  .icon :global(> svg) {
    color: currentColor;
    height: 1em;
    width: auto;
    display: block;
    flex-shrink: 0;
  }
</style>
