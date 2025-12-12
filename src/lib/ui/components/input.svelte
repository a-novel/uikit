<script lang="ts">
  import { Color } from "$lib/ui";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends HTMLInputAttributes {
    color?: z.infer<typeof Color>;
    wrapperProps?: Omit<Partial<HTMLAttributes<HTMLDivElement>>, "children">;
    startAdornment?: Snippet;
    endAdornment?: Snippet;
  }

  let { color, wrapperProps, startAdornment, endAdornment, value = $bindable(), ...props }: Props = $props();
</script>

<div data-color={color ?? ""} {...wrapperProps}>
  {@render startAdornment?.()}
  <input bind:value {...props} />
  {@render endAdornment?.()}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--spacing-xs);
    border-width: thin;
    border-style: solid;
    border-color: var(--color-400);
    border-radius: var(--spacing-s);
    background-color: var(--color-100);
    padding: var(--spacing-xs) var(--spacing-s);
  }

  div[data-color=""] {
    border-color: var(--background);
    background-color: var(--background);
  }

  div > * {
    flex-shrink: 0;
  }

  input {
    flex-grow: 1;
    flex-shrink: 1;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    background: none;
    padding: 0 var(--spacing-s);
    min-width: 0;
    color: var(--text);
  }

  input:read-only {
    color: var(--color-gray-400);
  }

  input:disabled {
    color: var(--color-gray-300);
  }
</style>
