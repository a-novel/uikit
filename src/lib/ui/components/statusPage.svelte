<script lang="ts">
  import { ComponentColor } from "$lib/ui";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    icon?: Snippet;
    title?: Snippet;
    color?: z.infer<typeof ComponentColor>;
  }

  let { children, icon, title, color, ...props }: Props = $props();
</script>

<section {...props} data-color={color ?? "default"}>
  {#if icon}
    <div class="icon">
      {@render icon()}
    </div>
  {/if}

  {#if title}
    <h2 data-width="m">
      {@render title()}
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
