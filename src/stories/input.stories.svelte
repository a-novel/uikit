<script context="module" lang="ts">
  import { Button, Input, Section } from "$lib/ui/components";
  import { LOREM_IPSUM } from "$lib/utils";

  import Icon from "@iconify/svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
      disabled: {
        control: { type: "boolean" },
      },
    },
    args: {},
  });
</script>

{#snippet base()}
  <Section>
    <Input />
  </Section>
{/snippet}

<Story name="Primary" template={base} />

{#snippet adornments()}
  <Section>
    <Input>
      {#snippet startAdornment()}
        <Button icon>
          <Icon icon="material-symbols:edit-outline" />
        </Button>
        <Button icon>
          <Icon icon="material-symbols:edit-outline" />
        </Button>
      {/snippet}
      {#snippet endAdornment()}
        <Button icon>
          <Icon icon="material-symbols:edit-outline" />
        </Button>
        <Button icon>
          <Icon icon="material-symbols:edit-outline" />
        </Button>
      {/snippet}
    </Input>
  </Section>
{/snippet}

<Story name="Adornments" template={adornments} />

{#snippet colors()}
  <Section style="display: flex; flex-direction: column; gap: var(--spacing-m)">
    <Input color="primary" />
    <Input color="secondary" />
    <Input color="accent" />
  </Section>
{/snippet}

<Story name="Colors" template={colors} />

{#snippet readOnly()}
  <Section style="display: flex; flex-direction: column; gap: var(--spacing-m)">
    <Input readonly value={LOREM_IPSUM.SHORT} />
  </Section>
{/snippet}

<Story name="Readonly" template={readOnly} />

{#snippet disabled()}
  <Section style="display: flex; flex-direction: column; gap: var(--spacing-m)">
    <Input disabled value={LOREM_IPSUM.SHORT} />
  </Section>
{/snippet}

<Story name="Disabled" template={disabled} />
