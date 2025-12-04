<script lang="ts">
  import { StatusPage } from "$lib/ui/components";

  import AddIcon from "virtual:icons/material-symbols/add";
  import DestructionIcon from "virtual:icons/material-symbols/destruction-outline-rounded";
  import RemoveIcon from "virtual:icons/material-symbols/remove";

  import type { HTMLAttributes } from "svelte/elements";

  type Props = Omit<HTMLAttributes<HTMLElement>, "title" | "children"> & {
    error?: unknown;
  };

  let { error, ...props }: Props = $props();

  let showDetails = $state(false);
</script>

<StatusPage {...props} color="accent">
  {#snippet icon()}
    <DestructionIcon />
  {/snippet}
  {#snippet title()}
    Oops! An unexpected error occurred.
  {/snippet}
  <span>An error that shouldn't happen occurred on our server. We are working to fix it as soon as possible.</span>
  <br />
  <span style="color: var(--color-gray-600)">You may retry later or clear your browser cache.</span>

  {#if error}
    <div class="details">
      <button aria-expanded={showDetails} type="button" class="title" onclick={() => (showDetails = !showDetails)}>
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
</StatusPage>

<style>
  .details {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: stretch;
    height: fit-content;
    margin-top: var(--spacing-l);
    border-radius: var(--spacing-m);
    background-color: var(--color-gray-200);

    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-s);
      padding: var(--spacing-s);
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
      padding: 0 var(--spacing-m);
      margin: 0;
      transition: linear 0.3s;
      white-space: break-spaces;
      overflow: hidden;
      color: var(--color-gray-600);

      &[data-display="true"] {
        transform: scaleY(1);
        margin-bottom: var(--spacing-s);
        height: 100%;
      }
    }
  }
</style>
