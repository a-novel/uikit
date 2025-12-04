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
    flex-direction: column;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    gap: var(--spacing-s);
  }

  .icon {
    color: var(--color-400);
    font-size: 6rem;
  }

  h2 {
    text-align: center;
    color: var(--color-500);
  }

  p {
    text-align: center;
    margin: 0;
  }
</style>
