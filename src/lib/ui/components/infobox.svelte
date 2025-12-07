<script lang="ts">
  import { ComponentColor } from "$lib/ui/index.js";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    color?: z.infer<typeof ComponentColor>;
    icon?: Snippet;
  }

  const { children, color = "default", icon, ...props }: Props = $props();
</script>

<div {...props} class={["box", props.class]} data-color={color}>
  {@render children?.()}
  <div class="icon">
    {@render icon?.()}
  </div>
</div>

<style>
  .box {
    position: relative;
    border-width: thin;
    border-style: solid;
    border-color: var(--color-400);
    border-radius: var(--spacing-s);
    background-color: var(--color-100);
    padding: var(--spacing-xs) var(--spacing-s);
    overflow: hidden;
    color: var(--color-500);
    font-size: var(--font-size-p);
  }

  .icon {
    display: flex;
    position: absolute;
    top: 50%;
    right: var(--spacing-s);
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
    transform-origin: center;
    opacity: 0.3;
    z-index: 0;
    color: inherit;
    font-size: 4em;
    line-height: 4em;
    user-select: none;
  }
</style>
