<script lang="ts">
  import { ComponentColor } from "$lib/ui/index.js";

  import type { HTMLButtonAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends HTMLButtonAttributes {
    color?: z.infer<typeof ComponentColor> | "invert";
    size?: "small" | "medium" | "large";
    gradient?: boolean;
    glow?: boolean;
    icon?: boolean;
  }
  let {
    children,
    color = "default",
    size = "medium",
    gradient = false,
    glow = false,
    icon,
    ...props
  }: Props = $props();
</script>

<button {...props} data-gradient={gradient} data-glow={glow} data-size={size} data-icon={icon} data-color={color}>
  {@render children?.()}
</button>

<style>
  button {
    cursor: pointer;
    transition: linear 0.1s;
    border-style: solid;
    border-width: thin;
    border-color: var(--color-200);
    background-color: var(--color-200);
    color: var(--color-600);
    box-sizing: border-box;
  }

  button[data-color="invert"] {
    background-color: var(--background);
    border-color: var(--background);
    color: var(--color-400);
  }

  button[data-icon="true"] {
    height: 1.5lh;
    width: 1.5lh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button[data-icon="true"] :global(> svg) {
    color: inherit;
    height: 1em;
    width: auto;
    display: block;
    flex-shrink: 0;
  }

  button[data-gradient="true"]:not(:disabled) {
    background-image: linear-gradient(45deg, var(--color-c-200) 0%, var(--color-200) 70%, var(--color-cc-200) 100%);
  }

  button[data-glow="true"]:not(:disabled) {
    box-shadow:
      oklch(from var(--color-c-500) l c h / 40%) 0 0 0.3em 0,
      oklch(from var(--color-c-500) l c h / 20%) 0.5em 0.5em 1.4em 0,
      oklch(from var(--color-500) l c h / 20%) -0.5em -0.5em 1.4em 0,
      oklch(from var(--color-cc-500) l c h / 20%) 0.5em -0.5em 1.4em 0,
      oklch(from var(--color-500) l c h / 20%) -0.5em 0.5em 1.4em 0;
  }

  button:disabled {
    cursor: not-allowed;
    position: relative;
    background-color: var(--color-200);
    border-color: var(--color-200);
  }

  button::after {
    position: absolute;
    content: "";
    display: block;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    z-index: 2;
    border-radius: inherit;
    backdrop-filter: grayscale(60%) saturate(60%);
  }

  button:not(:disabled)::after {
    display: none;
  }

  button[data-size="small"] {
    border-radius: var(--spacing-xs);
    padding: 0 var(--spacing-s);
    font-size: var(--font-size-small);
  }
  button[data-size="medium"] {
    border-radius: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-s);
    font-size: var(--font-size-p);
  }
  button[data-size="large"] {
    border-radius: var(--spacing-s);
    padding: var(--spacing-s) var(--spacing-m);
    font-size: var(--font-size-h6);
  }
</style>
