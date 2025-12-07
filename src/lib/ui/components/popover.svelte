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

  function togglePopoverOpen(evt: MouseEvent) {
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
    togglePopoverOpen,
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
      event.stopImmediatePropagation();
      popoverOpen = false;
      return;
    }
    if (target.isSameNode(popoverContent)) {
      event.stopImmediatePropagation();
      return;
    }

    if (popoverContent.contains(target)) {
      // Ignore event if the `keep-popover` prop is set.
      if (target.dataset.keepPopover === "true") {
        return;
      }

      // Ignores click on static elements (titles, spans, etc.)
      if (ignoreTagNames.includes(target.tagName.toUpperCase())) {
        return;
      }
    }

    event.stopImmediatePropagation();
    popoverOpen = false;
  }

  // Auto-close popover when clicking outside.
  $effect(() => {
    document.addEventListener("click", closePopover, true);
    return () => {
      document.removeEventListener("click", closePopover, true);
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
      z-index: var(--z-index-nav-popover);
      width: 24rem;
      top: var(--popover-offset);
      right: 0;
      background-color: var(--background);
      margin: 0;
      padding: 0;

      overflow-y: auto;
      overflow-x: hidden;
      flex-direction: column;
      gap: var(--spacing-m);

      &[data-popover="true"] {
        display: flex;
      }
    }

    .popover-base {
      & .popover-base {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: unset !important;
      }
    }

    @media (max-width: 28rem) {
      .popover-base {
        width: 100% !important;
        left: 0;
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
      .popover {
        border-radius: 0 0 0 var(--spacing-m);
      }
    }
  }
</style>
