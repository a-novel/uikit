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

  let { color, wrapperProps, startAdornment, endAdornment, ...props }: Props = $props();
</script>

<div data-color={color ?? ""} {...wrapperProps}>
  {@render startAdornment?.()}
  <input {...props} />
  {@render endAdornment?.()}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-s);
    gap: var(--spacing-xs);
    flex-wrap: nowrap;
    border-radius: var(--spacing-s);
    border-width: thin;
    border-style: solid;
    border-color: var(--color-400);
    background-color: var(--color-100);
  }

  div[data-color=""] {
    background-color: var(--background);
    border-color: var(--background);
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
    border: none;
    background: none;
    outline: none;
    min-width: 0;
    padding: 0 var(--spacing-s);
    color: var(--text);
  }

  input:read-only {
    color: var(--color-gray-400);
  }

  input:disabled {
    color: var(--color-gray-300);
  }
</style>
