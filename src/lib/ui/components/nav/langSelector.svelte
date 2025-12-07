<script lang="ts">
  import { getActiveLocale } from "$lib/ui";
  import { LNG, LNG_META } from "$lib/const";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { Popover, Button } from "$lib/ui/components";

  interface Props extends Omit<HTMLButtonAttributes, "children" | "onclick"> {
    fullWidth?: boolean;
  }

  let { class: className, fullWidth = false, ...props }: Props = $props();

  let activeLocale = getActiveLocale();

  function setLocale(lng: string) {
    activeLocale.locale = lng as LNG;
  }
</script>

<Popover>
  {#snippet button(binding, _, togglePopoverOpen)}
    <button
      type="button"
      {...props}
      data-keep-popover="true"
      bind:this={binding.getRef, binding.setRef}
      data-fullWidth={fullWidth}
      class={["menu", className]}
      aria-label="Select language"
      onclick={togglePopoverOpen}
    >
      <img
        loading="lazy"
        data-keep-popover="true"
        src={`https://flagcdn.com/w40/${LNG_META[activeLocale.locale].flag}.png`}
        alt={`Active locale (${LNG_META[activeLocale.locale].label})`}
      />
      <span data-show={fullWidth} data-keep-popover="true">{LNG_META[activeLocale.locale].label}</span>
    </button>
  {/snippet}
  {#snippet content(binding, popoverOpen, togglePopoverOpen)}
    <div
      class="popover-base popover"
      bind:this={binding.getRef, binding.setRef}
      data-fullWidth={fullWidth}
      data-popover={popoverOpen}
      role={popoverOpen ? "dialog" : undefined}
      aria-label={popoverOpen ? "Lang selection menu" : undefined}
    >
      <ul>
        {#each Object.entries(LNG_META) as [lng, meta] (lng)}
          <li>
            <button
              data-selected={lng === activeLocale.locale}
              aria-label={`Select ${meta.label}`}
              type="button"
              onclick={() => setLocale(lng)}
            >
              <img loading="lazy" src={`https://flagcdn.com/w40/${meta.flag}.png`} alt={`Locale (${meta.label})`} />
              <span>{meta.label}</span>
            </button>
          </li>
        {/each}
      </ul>
      <div class="cancel" data-show={fullWidth}>
        <Button onclick={togglePopoverOpen}>Cancel</Button>
      </div>
    </div>
  {/snippet}
</Popover>

<style>
  .menu {
    user-select: none;
    cursor: pointer;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background-color: transparent;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-m);
    font-size: var(--font-size-p);
    color: var(--color-gray-800);

    &[data-fullWidth="true"] {
      width: 100%;
      box-sizing: border-box;
    }

    & > span {
      color: inherit;
      flex-shrink: 0;
    }

    & > img {
      background-color: var(--color-gray-500);
      box-shadow: var(--color-gray-500) 0 0 0 0.1rem;
      height: 1.4em;
      width: auto;
      margin: 0;
      display: block;
      border-radius: var(--spacing-xxs);
    }
  }

  .popover {
    width: 16rem;

    align-items: stretch;

    & .cancel {
      padding: var(--spacing-m);
      position: sticky;
      bottom: 0;
      z-index: 99;
      background-color: var(--background);

      display: flex;
      flex-direction: column;
      align-items: stretch;

      margin-top: auto;
    }

    & > ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: var(--spacing-s);
      gap: var(--spacing-m);
      margin: 0;

      & > li {
        user-select: none;

        display: flex;
        flex-direction: column;
        align-items: stretch;

        & > button {
          border: none;
          outline: none;
          background-color: var(--background);

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          margin: 0;
          padding: var(--spacing-s) var(--spacing-m);
          border-radius: var(--spacing-xs);

          cursor: pointer;
          font-size: var(--font-size-p);

          transition: linear 0s;
          color: var(--color-gray-800);

          &:hover:not([data-selected="true"]) {
            transition: linear 0.1s;
            background-color: var(--color-gray-200);
          }

          &[data-selected="true"] {
            color: var(--color-primary-700);
            background-color: var(--color-primary-200);
          }

          & > img {
            height: 1.2em;
            width: auto;
            box-shadow: var(--color-gray-500) 0 0 0 0.1rem;
          }
        }
      }
    }
  }
</style>
