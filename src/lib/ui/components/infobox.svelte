<script lang="ts">
  import { ComponentColor } from "$lib/ui/index.js";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    color?: z.infer<typeof ComponentColor>;
    title?: Snippet;
    icon?: Snippet;
  }

  const { children, color = "default", icon, title, ...props }: Props = $props();
</script>

<div {...props} class={["box", props.class]} data-color={color}>
  {#if title || icon}
    <div class="title">
      {#if icon}
        <span class="icon">
          {@render icon()}
        </span>
      {/if}
      <span class="text">
        {@render title?.()}
      </span>
    </div>
  {/if}

  {@render children?.()}
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

  .title {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-s);
    font-weight: bold;
    font-size: var(--font-size-h5);

    & > .icon {
      font-size: 1.2em;
    }

    & > .text {
      white-space: pre;
    }
  }
</style>
