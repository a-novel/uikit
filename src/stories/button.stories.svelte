<script context="module" lang="ts">
  import { Button, Section } from "$lib/ui/components";

  import EditIcon from "virtual:icons/material-symbols/edit-outline";

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

{#snippet primary()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button onclick={fn()}>Click me!</Button>
  </div>
{/snippet}

<Story name="Primary" template={primary} />

{#snippet sizes()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button size="small" onclick={fn()}>Click me!</Button>
    <Button size="medium" onclick={fn()}>Click me!</Button>
    <Button size="large" onclick={fn()}>Click me!</Button>
  </div>
  <div style="height: var(--spacing-m)"></div>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button size="small" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button size="medium" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button size="large" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
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
  <div style="height: var(--spacing-m)"></div>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="primary" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="secondary" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="accent" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
  </div>
{/snippet}

<Story name="Colors base" template={colors} />

{#snippet invert()}
  <Section>
    <Button color="invert" onclick={fn()}>Click me!</Button>
    <div style="height: var(--spacing-m)"></div>
    <Button color="invert" icon onclick={fn()}><EditIcon color="currentColor" /></Button>
  </Section>
{/snippet}

<Story name="Color invert" template={invert} />

{#snippet gradients()}
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" gradient onclick={fn()}>Click me!</Button>
    <Button color="primary" gradient onclick={fn()}>Click me!</Button>
    <Button color="secondary" gradient onclick={fn()}>Click me!</Button>
    <Button color="accent" gradient onclick={fn()}>Click me!</Button>
  </div>
  <div style="height: var(--spacing-m)"></div>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" icon gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="primary" icon gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="secondary" icon gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="accent" icon gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
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
  <div style="height: var(--spacing-m)"></div>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" icon glow onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="primary" icon glow onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="secondary" icon glow onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="accent" icon glow onclick={fn()}><EditIcon color="currentColor" /></Button>
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
  <div style="height: var(--spacing-m)"></div>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" icon glow gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="primary" icon glow gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="secondary" icon glow gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="accent" icon glow gradient onclick={fn()}><EditIcon color="currentColor" /></Button>
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
  <div style="height: var(--spacing-m)"></div>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m)">
    <Button color="default" icon disabled onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="primary" icon disabled onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="secondary" icon disabled onclick={fn()}><EditIcon color="currentColor" /></Button>
    <Button color="accent" icon disabled onclick={fn()}><EditIcon color="currentColor" /></Button>
  </div>
{/snippet}

<Story name="Disabled" template={disabled} />
