<script lang="ts">
  import { ComponentColor, RenderAny } from "$lib/ui";

  import type { Component, Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    color?: z.infer<typeof ComponentColor>;
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    title?: Snippet | string | Component<{}, {}, "">;
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    icon?: Snippet | Component<{}, {}, "">;
  }

  const { children, color = "default", icon, title, ...props }: Props = $props();
</script>

<div {...props} class={["box", props.class]} data-color={color}>
  {#if title || icon}
    <div class="title">
      {#if icon}
        <span class="icon">
          <RenderAny component={icon} />
        </span>
      {/if}
      {#if title}
        <span class="text">
          <RenderAny component={title} />
        </span>
      {/if}
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
