<script context="module" lang="ts">
  import { Button } from "$lib/ui/components";

  import { createRawSnippet } from "svelte";

  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      disabled: {
        control: { type: "boolean" }
      }
    },
    args: {
      onclick: fn(),
      children: createRawSnippet(() => ({
        render: () => "Click me!"
      }))
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{}} />

{#snippet sizes()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button size="small" onclick={fn()}>Click me!</Button>
    <Button size="medium" onclick={fn()}>Click me!</Button>
    <Button size="large" onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Sizes" template={sizes} />

{#snippet colors()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" onclick={fn()}>Click me!</Button>
    <Button color="primary" onclick={fn()}>Click me!</Button>
    <Button color="secondary" onclick={fn()}>Click me!</Button>
    <Button color="accent" onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Colors base" template={colors} />

{#snippet gradients()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" gradient onclick={fn()}>Click me!</Button>
    <Button color="primary" gradient onclick={fn()}>Click me!</Button>
    <Button color="secondary" gradient onclick={fn()}>Click me!</Button>
    <Button color="accent" gradient onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Colors gradients" template={gradients} />

{#snippet glows()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" glow onclick={fn()}>Click me!</Button>
    <Button color="primary" glow onclick={fn()}>Click me!</Button>
    <Button color="secondary" glow onclick={fn()}>Click me!</Button>
    <Button color="accent" glow onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Colors glows" template={glows} />

{#snippet gradientsAndGlows()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" glow gradient onclick={fn()}>Click me!</Button>
    <Button color="primary" glow gradient onclick={fn()}>Click me!</Button>
    <Button color="secondary" glow gradient onclick={fn()}>Click me!</Button>
    <Button color="accent" glow gradient onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Colors glows + gradients" template={gradientsAndGlows} />

{#snippet disabled()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" disabled onclick={fn()}>Click me!</Button>
    <Button color="primary" disabled onclick={fn()}>Click me!</Button>
    <Button color="secondary" disabled onclick={fn()}>Click me!</Button>
    <Button color="accent" disabled onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Disabled" template={disabled} />
