<script lang="ts">
  import { Button, Popover } from "$lib/ui/components/index";
  import { type NavItem, isNavButton, isNavLink } from "$lib/ui/components/navbar.helper.svelte.js";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { Debounce } from "@a-novel/nodelib-browser/utils";

  import CloseIcon from "~icons/material-symbols/close";
  import MenuIcon from "~icons/material-symbols/menu";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    homeButton: Snippet;
    homeLink: string;

    nav: NavItem[];

    actionsDesktop?: Snippet;
    actionsMobile?: Snippet;
  }

  let { homeButton, homeLink, nav, actionsMobile, actionsDesktop, class: className, ...props }: Props = $props();

  // Used to position the popover menu under the nav bar.
  let wrapperHeight = $state(0);

  // Control what elements are displayed depending on the available space.
  let rightElement: HTMLElement;
  let navElement: HTMLElement;
  let desktopActionsElement: HTMLElement;
  let mobileActionsElement: HTMLElement;

  // Prevent too many calls.
  const debouncer = new Debounce(250);

  // Reflow the menu when the wrapper width changes to determine what to display.
  function reflowMenu(wrapperObservedWidth: any | ResizeObserverSize[] | null | undefined) {
    if (wrapperObservedWidth == null || !Array.isArray(wrapperObservedWidth) || !wrapperObservedWidth.length) {
      return; // No reflow if we can't get wrapper dimensions.
    }

    if (!navElement || !desktopActionsElement || !mobileActionsElement) {
      return; // No reflow if we can't get elements dimensions.
    }

    const wrapperWidth = (wrapperObservedWidth as ResizeObserverSize[])[0].inlineSize;

    // Prevents flashing.
    navElement.style.opacity = "0";
    mobileActionsElement.style.opacity = "0";

    // Reset displays for measurements. This will not affect the wrapper's client width, as it is locked to its
    // container.
    navElement.dataset.show = "true";

    // If nav element is already hidden by static css rules, return.
    if (getComputedStyle(navElement).display === "none") {
      mobileActionsElement.dataset.show = "true";
      return;
    }

    mobileActionsElement.dataset.show = "false";

    // If the rightmost element does not overlap the wrapper, nothing to do. Fall back to the default state if not
    // already.
    if (Math.floor(rightElement.getBoundingClientRect().right) <= wrapperWidth) {
      return;
    }

    // Hide links and see if the right menu still overflows.
    navElement.dataset.show = "false";
    mobileActionsElement.dataset.show = "true";
  }

  function postReflow() {
    navElement.style.opacity = "";
    mobileActionsElement.style.opacity = "";
  }

  function reflowMenuDebounced(wrapperObservedWidth: any | ResizeObserverSize[] | null | undefined) {
    debouncer.call(() => {
      reflowMenu(wrapperObservedWidth);
      postReflow();
    });
  }
</script>

<!-- Main navigation -->

{#snippet navLink(item: NavItem)}
  {#if isNavButton(item)}
    <button data-active={item.active} onclick={item.action}>
      {item.content}
    </button>
  {:else if isNavLink(item)}
    <a data-active={item.active} href={item.link}>
      {item.content}
    </a>
  {/if}
{/snippet}

<!-- Side navigation -->

{#snippet mobileMenu(menuActions: Snippet | undefined)}
  <Popover>
    {#snippet button(binding, popoverOpen, togglePopoverOpen)}
      <Button
        bind:element={binding.getRef, binding.setRef}
        icon
        color="invert"
        class="popover-button"
        onclick={togglePopoverOpen}
        aria-label={popoverOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {#if popoverOpen}
          <CloseIcon />
        {:else}
          <MenuIcon />
        {/if}
      </Button>
    {/snippet}
    {#snippet content(binding, popoverOpen)}
      <div
        class="popover-base popover"
        bind:this={binding.getRef, binding.setRef}
        data-popover={popoverOpen}
        role={popoverOpen ? "dialog" : undefined}
        aria-modal={popoverOpen ? "true" : undefined}
        aria-label={popoverOpen ? "Navigation menu" : undefined}
      >
        <nav class="main" data-keep-popover="true">
          {#each nav as navItem, i (`${i}:${navItem.content}`)}
            {@render navLink(navItem)}
          {/each}
        </nav>
        <div class="actions" data-keep-popover="true">
          {@render menuActions?.()}
        </div>
      </div>
    {/snippet}
  </Popover>
{/snippet}

<!--
  Add a negative offset of 1px to the top attribute to compensate for some browser leaving a visible pixel gap
  between the popover and the head menu (due to floating numbers).
 -->
<div
  {...props}
  style={`--popover-offset: ${wrapperHeight - 1}px; ${props.style ?? ""}`}
  class={["wrapper", className]}
  bind:clientHeight={wrapperHeight}
  bind:borderBoxSize={null, reflowMenuDebounced}
>
  <div class="left">
    <a class="home" href={homeLink}>
      {@render homeButton()}
    </a>
  </div>

  <div class="middle">
    <nav class="main" bind:this={navElement}>
      {#each nav as navItem, i (`${i}:${navItem.content}`)}
        {@render navLink(navItem)}
      {/each}
    </nav>
  </div>

  <div class="right" bind:this={rightElement}>
    <div class="desktop" bind:this={desktopActionsElement}>
      {@render actionsDesktop?.()}
    </div>
    <div class="mobile" bind:this={mobileActionsElement}>
      {@render mobileMenu(actionsMobile)}
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    position: sticky;
    top: 0;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    gap: var(--spacing-m);
    z-index: var(--z-index-nav);
    box-sizing: border-box;
    margin: 0 0 var(--spacing-m) 0;
    box-shadow: oklch(from var(--background) l c h / 80%) 0 0 var(--spacing-s) 0;

    background-color: var(--background);
    padding: 0;
    max-width: 100%;
    overflow: auto;

    &:has(.desktop:global([data-show="true"])) .mobile .actions {
      display: none;
    }
  }

  .left,
  .right {
    /* Center middle element */
    flex-grow: 1;
    flex-basis: 0;
  }

  .left,
  .right,
  .middle {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-m);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .left {
    justify-content: flex-start;
  }
  .right {
    justify-content: flex-end;
    gap: 0;
  }
  .middle {
    justify-content: center;

    & > .main {
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      & > * {
        padding: var(--spacing-m);
        text-align: center;
        white-space: nowrap;
      }
    }
  }

  .main {
    display: flex;
    box-sizing: border-box;

    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: linear 0.1s;
      cursor: pointer;
      border-radius: var(--spacing-s);
      color: var(--color-gray-500);
      font-size: var(--font-size-p);
      user-select: none;
      text-align: center;

      &:not([data-active="true"]):hover {
        color: var(--text);
      }

      &[data-active="true"] {
        color: var(--color-primary-600);
      }
    }

    & > button {
      outline: none;
      border: none;
      background-color: var(--background);
    }

    & > a {
      text-decoration: none;
      &:visited {
        color: initial;
      }
    }
  }

  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--background);
    padding: var(--spacing-s) var(--spacing-m);
    height: var(--font-size-h4);
    user-select: none;
    text-decoration: none !important;

    & > :global(*) {
      width: auto;
      height: inherit;
    }
  }

  .mobile {
    display: block;

    & > :global(.popover-button) {
      font-size: var(--font-size-h4);
    }

    & > .popover {
      & > .main {
        flex-direction: column;
        align-items: stretch;
        max-width: 100%;

        & > * {
          position: relative;
          padding: var(--spacing-s) var(--spacing-l);
          text-align: center;
          white-space: nowrap;

          &[data-active="true"] {
            background-color: var(--color-primary-200);
          }
        }
      }

      & > .actions {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-s);
      }
    }
  }

  .desktop {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--spacing-s);
    margin-right: var(--spacing-s);
  }

  @media (max-width: 36rem) {
    .desktop {
      display: none;
    }

    .middle > nav.main {
      display: none;
    }
  }

  @media (min-width: 36rem) {
    .mobile {
      &:not([data-show="true"]) {
        display: none;
      }

      & .actions {
        display: none !important;
      }
    }
  }
</style>
