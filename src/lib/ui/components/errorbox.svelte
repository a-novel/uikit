<script lang="ts">
  import { InfoBox } from "$lib/ui/components/index";

  import type { ComponentProps, Snippet } from "svelte";

  import Icon from "@iconify/svelte";
  import { getTranslate } from "@tolgee/svelte";

  interface Props extends Omit<ComponentProps<typeof InfoBox>, "color" | "icon" | "title"> {
    icon?: Snippet;
    title?: Snippet;
    error?: unknown | unknown[];
  }

  const { children, title, error, icon, ...props }: Props = $props();

  let showDetails = $state(false);

  const { t } = getTranslate("common");
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
      <button
        type="button"
        class="title"
        aria-label={$t("errorbox.aria.toggleDetails", "Toggle error details")}
        onclick={() => (showDetails = !showDetails)}
      >
        <span class="icon">
          {#if showDetails}
            <Icon icon="material-symbols:remove" />
          {:else}
            <Icon icon="material-symbols:add" />
          {/if}
        </span>
        <span class="text">
          {#if showDetails}
            {$t("errorbox.toggleDetails.hide", "Hide error details")}
          {:else}
            {$t("errorbox.toggleDetails.show", "Show error details")}
          {/if}
        </span>
      </button>
      <pre
        class="content"
        aria-label={$t("errorbox.aria.details", "Error details")}
        aria-hidden={!showDetails}
        data-display={showDetails}>{error.toString().trim()}</pre
      >
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
    align-items: stretch;
    gap: var(--spacing-s);
    height: fit-content;
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

  .details {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    height: fit-content;

    & > .title {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: var(--spacing-s);
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
      padding: 0 var(--spacing-s);
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
      margin: 0 0 var(--spacing-s) var(--spacing-s);
      border-width: 0 0 0 thin;
      border-style: solid;
      border-color: currentColor;
      padding: 0 var(--spacing-m) 0 var(--spacing-s);
      height: 0;
      overflow: hidden;
      white-space: break-spaces;

      &[data-display="true"] {
        transform: scaleY(1);
        margin-top: var(--spacing-s);
        height: 100%;
      }
    }
  }
</style>
