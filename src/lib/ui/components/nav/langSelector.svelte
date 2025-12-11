<script lang="ts">
  import { LNG, LNG_META } from "$lib/const";
  import { Button, Popover } from "$lib/ui/components";

  import type { HTMLButtonAttributes } from "svelte/elements";

  import { getTolgee, getTranslate } from "@tolgee/svelte";

  interface Props extends Omit<HTMLButtonAttributes, "children" | "onclick"> {
    fullWidth?: boolean;
  }

  let { class: className, fullWidth = false, ...props }: Props = $props();

  let popover: ReturnType<typeof Popover>;

  const tolgee = getTolgee(["language", "pendingLanguage"]);
  let activeLocale = $tolgee.getLanguage() as LNG | undefined;

  function setLocale(evt: MouseEvent, lng: string) {
    evt.stopPropagation();
    popover.togglePopoverOpen(evt);
    $tolgee.changeLanguage(lng);
  }

  const { t } = getTranslate("common");
</script>

<Popover bind:this={popover}>
  {#snippet button(binding, _, togglePopoverOpen)}
    <button
      type="button"
      {...props}
      data-keep-popover="true"
      bind:this={binding.getRef, binding.setRef}
      data-fullWidth={fullWidth}
      class={["menu", className]}
      aria-label={$t("langSelector.aria.selectLanguage", "Select language")}
      onclick={togglePopoverOpen}
    >
      {#if activeLocale}
        <img
          loading="lazy"
          data-keep-popover="true"
          src={`https://flagcdn.com/w40/${LNG_META[activeLocale].flag}.png`}
          alt={$t("langSelector.aria.activeLocale", "Active locale ({lang})", { lang: LNG_META[activeLocale].label })}
        />
        <span data-show={fullWidth} data-keep-popover="true">{LNG_META[activeLocale].label}</span>
      {/if}
    </button>
  {/snippet}
  {#snippet content(binding, popoverOpen, togglePopoverOpen)}
    <div
      class="popover-base popover"
      bind:this={binding.getRef, binding.setRef}
      data-fullWidth={fullWidth}
      data-popover={popoverOpen}
      aria-hidden={!popoverOpen}
      data-keep-popover="true"
      role="dialog"
      aria-label={popoverOpen ? $t("langSelector.aria.selectionMenu", "Lang selection menu") : undefined}
    >
      <ul>
        {#each Object.entries(LNG_META) as [lng, meta] (lng)}
          <li>
            <button
              data-selected={lng === activeLocale}
              aria-label={`Select ${meta.label}`}
              type="button"
              onclick={(evt) => setLocale(evt, lng)}
            >
              <img
                loading="lazy"
                src={`https://flagcdn.com/w40/${meta.flag}.png`}
                alt={$t("langSelector.alt.flag", "Select locale ({lang})", { lang: meta.label })}
              />
              <span>{meta.label}</span>
            </button>
          </li>
        {/each}
      </ul>
      <div class="cancel" data-show={fullWidth}>
        <Button
          aria-label={$t("langSelector.aria.closeMenu", "Close language selection menu")}
          onclick={togglePopoverOpen}>{$t("langSelector.closeMenu", "Close language selection menu")}</Button
        >
      </div>
    </div>
  {/snippet}
</Popover>

<style>
  .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-m);
    cursor: pointer;
    margin: 0;
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0;
    color: var(--color-gray-800);
    font-size: var(--font-size-p);
    user-select: none;

    &[data-fullWidth="true"] {
      box-sizing: border-box;
      width: 100%;
    }

    & > span {
      flex-shrink: 0;
      color: inherit;
    }

    & > img {
      display: block;
      margin: 0;
      box-shadow: var(--color-gray-500) 0 0 0 0.1rem;
      border-radius: var(--spacing-xxs);
      background-color: var(--color-gray-500);
      width: auto;
      height: 1.4em;
    }
  }

  .popover {
    align-items: stretch;
    width: 16rem;

    & .cancel {
      display: flex;
      position: sticky;
      bottom: 0;
      flex-direction: column;
      align-items: stretch;
      z-index: 99;

      margin-top: auto;
      background-color: var(--background);
      padding: var(--spacing-m);
    }

    & > ul {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-s);
      margin: 0;
      padding: 0;
      list-style: none;

      & > li {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        user-select: none;

        & > button {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          transition: linear 0s;

          cursor: pointer;

          margin: 0;
          outline: none;
          border: none;
          border-radius: var(--spacing-xs);
          background-color: var(--background);
          padding: var(--spacing-s) var(--spacing-m);
          color: var(--color-gray-800);
          font-size: var(--font-size-p);

          &:hover:not([data-selected="true"]) {
            transition: linear 0.1s;
            background-color: var(--color-gray-200);
          }

          &[data-selected="true"] {
            background-color: var(--color-primary-200);
            color: var(--color-primary-700);
          }

          & > img {
            box-shadow: var(--color-gray-500) 0 0 0 0.1rem;
            width: auto;
            height: 1.2em;
          }
        }
      }
    }
  }
</style>
