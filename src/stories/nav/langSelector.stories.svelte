<script context="module" lang="ts">
  import agoraLogoDark from "$assets/logos/integrated/agora (dark).png";
  import agoraLogoLight from "$assets/logos/integrated/agora (light).png";
  import { NavBar, type NavItem, Section } from "$lib/ui/components";
  import { LangSelector as LangSelectorMeta } from "$lib/ui/components/nav";

  import { LOREM_IPSUM } from "../utils";

  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Nav/LangSelector",
    component: LangSelectorMeta,
    tags: ["autodocs"],
    argTypes: {},
    args: {},
  });

  const navItemsDefault: NavItem[] = [
    {
      content: "Link 1",
      link: window.location.href,
    },
    {
      content: "Link 2",
      link: window.location.href,
      active: true,
    },
    {
      content: "Button 1",
      action: () => {},
    },
    {
      content: "Button 2",
      action: () => {},
    },
    {
      content: "Button 3",
      action: () => {},
    },
  ];
</script>

<script>
  // Import in a separate script because the `context="module"` prevents the context functions from working properly.
  import { Image } from "$lib/ui/components";
  import { LangSelector } from "$lib/ui/components/nav";
</script>

{#snippet dummyPage()}
  <p data-width="l" style="margin: auto">
    {LOREM_IPSUM.LONG}
  </p>
  <Section data-width="l" style="margin: auto">
    {LOREM_IPSUM.LONG}
  </Section>
  <p data-width="l" style="margin: auto">
    {LOREM_IPSUM.LONG}
  </p>
  <Section data-width="l" style="margin: auto">
    {LOREM_IPSUM.LONG}
  </Section>
{/snippet}

{#snippet homeIcon()}
  <Image alt="Agora Logo" src={agoraLogoDark} lightModeSrc={agoraLogoLight} />
{/snippet}

{#snippet primary()}
  <NavBar homeLink={window.location.href} nav={navItemsDefault}>
    {#snippet homeButton()}
      {@render homeIcon()}
    {/snippet}

    {#snippet actionsDesktop()}
      <LangSelector />
    {/snippet}
    {#snippet actionsMobile()}
      <h6>Settings</h6>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: var(--spacing-s);
          padding: 0 var(--spacing-m);
          "
      >
        <LangSelector fullWidth />
      </div>
    {/snippet}
  </NavBar>

  {@render dummyPage()}
{/snippet}

<Story name="Primary" template={primary} />

<style>
  :global(body):has(*) {
    padding: 0 !important;
  }
</style>
