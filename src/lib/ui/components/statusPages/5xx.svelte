<script lang="ts">
  import { StatusPage } from "$lib/ui/components";

  import type { HTMLAttributes } from "svelte/elements";

  import Icon from "@iconify/svelte";

  type Props = Omit<HTMLAttributes<HTMLElement>, "title" | "children"> & {
    error?: unknown;
  };

  let { error, ...props }: Props = $props();

  let showDetails = $state(false);
</script>

<StatusPage {...props} color="accent">
  {#snippet icon()}
    <Icon icon="material-symbols:destruction-outline-rounded" />
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
            <Icon icon="material-symbols:remove" />
          {:else}
            <Icon icon="material-symbols:add" />
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
    align-items: stretch;
    gap: 0;
    margin-top: var(--spacing-l);
    border-radius: var(--spacing-m);
    background-color: var(--color-gray-200);
    height: fit-content;

    & > .title {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-s);
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
      padding: var(--spacing-s);
      color: inherit;
      font-size: var(--font-size-h6);

      & > .text {
        white-space: pre;
      }
    }

    & > .content {
      position: relative;
      transform: scaleY(0);
      transform-origin: top;
      transition: linear 0.3s;
      margin: 0;
      padding: 0 var(--spacing-m);
      height: 0;
      overflow: hidden;
      color: var(--color-gray-600);
      white-space: break-spaces;

      &[data-display="true"] {
        transform: scaleY(1);
        margin-bottom: var(--spacing-s);
        height: 100%;
      }
    }
  }
</style>
