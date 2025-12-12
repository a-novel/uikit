<script lang="ts">
  import { ComponentColor, RenderAny } from "$lib/ui";

  import type { Component, Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    icon?: Snippet | Component<{}, {}, "">;
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    title?: Snippet | string | Component<{}, {}, "">;
    color?: z.infer<typeof ComponentColor>;
  }

  let { children, icon, title, color, ...props }: Props = $props();
</script>

<section {...props} data-color={color ?? "default"}>
  {#if icon}
    <div class="icon">
      <RenderAny component={icon} />
    </div>
  {/if}

  {#if title}
    <h2 data-width="m">
      <RenderAny component={title} />
    </h2>
  {/if}

  {#if children}
    <p data-width="m">
      {@render children()}
    </p>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: var(--spacing-s);
    margin: 0;
    padding: 0;
  }

  .icon {
    color: var(--color-400);
    font-size: 6rem;
  }

  h2 {
    color: var(--color-500);
    text-align: center;
  }

  p {
    margin: 0;
    text-align: center;
  }
</style>
