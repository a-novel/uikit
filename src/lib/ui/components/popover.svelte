<script lang="ts">
  import type { Snippet } from "svelte";

  interface InheritableRef<T> {
    getRef: () => T | undefined;
    setRef: (value: T | undefined) => void;
  }

  interface Props {
    content: Snippet<
      [bind: InheritableRef<HTMLElement>, popoverOpen: boolean, togglePopoverOpen: (evt: MouseEvent) => void]
    >;
    button: Snippet<
      [bind: InheritableRef<HTMLButtonElement>, popoverOpen: boolean, togglePopoverOpen: (evt: MouseEvent) => void]
    >;
  }

  let popoverContent: HTMLElement | undefined = undefined;
  let popoverButton: HTMLButtonElement | undefined = undefined;

  function getChildrenRef() {
    return popoverContent;
  }
  function setChildrenRef(ref: HTMLElement | undefined) {
    popoverContent = ref;
  }

  function getButtonRef() {
    return popoverButton;
  }
  function setButtonRef(ref: HTMLButtonElement | undefined) {
    popoverButton = ref;
  }

  let { content, button }: Props = $props();

  let popoverOpen = $state(false);

  export function togglePopoverOpen(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    popoverOpen = !popoverOpen;
  }

  export const states = {
    get popoverOpen() {
      return popoverOpen;
    },
    set popoverOpen(open: boolean) {
      popoverOpen = open;
    },
  };

  const ignoreTagNames = ["H1", "H2", "H3", "H4", "H5", "H6", "P"];

  function closePopover(event: MouseEvent) {
    if (!popoverOpen) {
      return;
    }

    const target = event.target as HTMLElement;

    // Should not happen, but do not take action if the expected elements are not properly defined.
    if (!popoverButton || !popoverContent) {
      return;
    }

    // Ignore events immediately on the button or popover themselves.
    if (target.isSameNode(popoverButton) || popoverButton.contains(target)) {
      event.stopPropagation();
      popoverOpen = false;
      return;
    }
    if (target.isSameNode(popoverContent)) {
      event.stopPropagation();
      return;
    }

    if (popoverContent.contains(target)) {
      // Ignore event if the `keep-popover` prop is set.
      if (target.dataset.keepPopover === "true") {
        event.stopPropagation();
        return;
      }

      // Ignores click on static elements (titles, spans, etc.)
      if (ignoreTagNames.includes(target.tagName.toUpperCase())) {
        return;
      }
    }

    event.stopPropagation();
    popoverOpen = false;
  }

  // Auto-close popover when clicking outside.
  $effect(() => {
    window.addEventListener("click", closePopover, false);
    return () => {
      window.removeEventListener("click", closePopover, false);
    };
  });
</script>

{@render button?.({ getRef: getButtonRef, setRef: setButtonRef }, popoverOpen, togglePopoverOpen)}
{@render content({ getRef: getChildrenRef, setRef: setChildrenRef }, popoverOpen, togglePopoverOpen)}

<style>
  :global {
    .popover-base {
      display: none;
      position: fixed;
      top: var(--popover-offset);
      right: 0;
      flex-direction: column;
      gap: 0;
      z-index: var(--z-index-nav-popover);
      margin: 0;
      background-color: var(--background);
      padding: var(--spacing-s);
      width: 24rem;
      overflow-x: hidden;

      overflow-y: auto;

      &[data-popover="true"] {
        display: flex;
      }

      & h6 {
        align-self: center;
        background-color: var(--background);
        padding: var(--spacing-s);
        width: fit-content;
        color: var(--text);
        font-weight: normal;
        text-align: center;

        &:before {
          display: block;
          position: absolute;
          right: var(--spacing-s);
          left: var(--spacing-s);
          z-index: -1;
          margin-top: calc(1lh / 2 - 1px);
          background-color: var(--color-gray-400);
          height: 1px;
          content: "";
        }
      }

      & .popover-base {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: unset !important;
      }
    }

    @media (max-width: 28rem) {
      .popover-base {
        right: 0;
        left: 0;
        width: unset !important;
      }

      body:has(*[data-popover="true"]) {
        overflow: hidden;
      }
    }

    @media (min-width: 28rem) {
      .popover-base {
        box-shadow: var(--color-gray-500) -0.1rem 0.1rem 0.1rem;
      }
    }

    @media (max-width: 36rem) {
      .popover-base {
        bottom: 0;
      }
    }

    @media (min-width: 36rem) {
      .popover-base {
        margin: var(--spacing-m);
        box-shadow: var(--color-gray-500) 0 0 0.1rem 0.1rem;
        border-radius: var(--spacing-m);
        max-height: calc(100vh - 2 * var(--spacing-m) - var(--popover-offset));
      }
    }
  }
</style>
