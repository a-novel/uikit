<script lang="ts">
  import { InfoBox } from "$lib/ui/components/index";

  import AddIcon from "virtual:icons/material-symbols/add";
  import RemoveIcon from "virtual:icons/material-symbols/remove";

  import type { ComponentProps, Snippet } from "svelte";

  interface Props extends Omit<ComponentProps<typeof InfoBox>, "color" | "icon" | "title"> {
    icon?: Snippet;
    title?: Snippet;
    error?: unknown | unknown[];
  }

  const { children, title, error, icon, ...props }: Props = $props();

  let showDetails = $state(false);
</script>

<span data-scope hidden></span>
<InfoBox {...props} color="accent">
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

  <span>{@render children?.()}</span>

  {#if error}
    <div class="details">
      <button type="button" class="title" onclick={() => (showDetails = !showDetails)}>
        <span class="icon">
          {#if showDetails}
            <RemoveIcon />
          {:else}
            <AddIcon />
          {/if}
        </span>
        <span class="text">
          {#if showDetails}
            Hide error details
          {:else}
            Show error details
          {/if}
        </span>
      </button>
      <pre class="content" data-display={showDetails}>{error.toString().trim()}</pre>
    </div>
  {/if}
</InfoBox>

<style>
  /*
    Waiting for svelte to support classname API:
    https://github.com/sveltejs/svelte/issues/7776
  */
  span[data-scope] + :global(*) {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    align-items: stretch;
    height: fit-content;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--spacing-s);
    flex-wrap: nowrap;
    font-size: var(--font-size-h5);
    font-weight: bold;

    & > .icon {
      font-size: 1.2em;
    }

    & > .text {
      white-space: pre;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: stretch;
    height: fit-content;

    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-s);
      padding: 0 var(--spacing-s);
      flex-wrap: nowrap;
      font-size: var(--font-size-h6);
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
      color: inherit;

      & > .text {
        white-space: pre;
      }
    }

    & > .content {
      transform-origin: top;
      position: relative;
      transform: scaleY(0);
      height: 0;
      padding: 0 var(--spacing-m) 0 var(--spacing-s);
      margin: 0 0 var(--spacing-s) var(--spacing-s);
      transition: linear 0.3s;
      white-space: break-spaces;
      border-color: currentColor;
      border-style: solid;
      border-width: 0 0 0 thin;
      overflow: hidden;

      &[data-display="true"] {
        transform: scaleY(1);
        margin-top: var(--spacing-s);
        height: 100%;
      }
    }
  }
</style>
