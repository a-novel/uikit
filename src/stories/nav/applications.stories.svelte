<script context="module" lang="ts">
  import agoraLogoDark from "$lib/assets/logos/integrated/agora (dark).png";
  import agoraLogoLight from "$lib/assets/logos/integrated/agora (light).png";
  import { NavBar, type NavItem, Section } from "$lib/ui/components";
  import { NavApplications as NavApplicationsMeta } from "$lib/ui/components/nav";
  import { LOREM_IPSUM } from "$lib/utils";

  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Nav/Applications",
    component: NavApplicationsMeta,
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

  const urls = {
    studio: "#",
    storyverse: "#",
  };
</script>

<script>
  // Import in a separate script because the `context="module"` prevents the context functions from working properly.
  import { Image } from "$lib/ui/components";
  import { NavApplications } from "$lib/ui/components/nav";
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
      <NavApplications {urls} />
    {/snippet}
    {#snippet actionsMobile()}
      <NavApplications {urls} mobile />
    {/snippet}
  </NavBar>

  {@render dummyPage()}
{/snippet}

<Story name="Primary" template={primary} />

{#snippet selected()}
  <NavBar homeLink={window.location.href} nav={navItemsDefault}>
    {#snippet homeButton()}
      {@render homeIcon()}
    {/snippet}

    {#snippet actionsDesktop()}
      <NavApplications current="studio" {urls} />
    {/snippet}
    {#snippet actionsMobile()}
      <NavApplications current="studio" {urls} mobile />
    {/snippet}
  </NavBar>

  {@render dummyPage()}
{/snippet}

<Story name="Selected" template={selected} />

<style>
  :global(body):has(*) {
    padding: 0 !important;
  }
</style>
