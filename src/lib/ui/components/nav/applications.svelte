<script lang="ts">
  import storyverseLogoDark from "$lib/assets/logos/integrated/storyverse (dark).png";
  import storyverseLogoLight from "$lib/assets/logos/integrated/storyverse (light).png";
  import studioLogoDark from "$lib/assets/logos/integrated/studio (dark).png";
  import studioLogoLight from "$lib/assets/logos/integrated/studio (light).png";
  import { Button, Image, Popover } from "$lib/ui/components";
  import { ActionSection } from "$lib/ui/components/nav";

  import type { ComponentProps } from "svelte";

  import Icon from "@iconify/svelte";
  import { getTranslate } from "@tolgee/svelte";

  const applications = {
    studio: {
      name: "Agora Studio",
      disabled: false,
      logo: {
        light: studioLogoLight,
        dark: studioLogoDark,
      },
    },
    storyverse: {
      name: "Agora Storyverse",
      disabled: true,
      logo: {
        light: storyverseLogoLight,
        dark: storyverseLogoDark,
      },
    },
  };

  interface Props extends Omit<ComponentProps<typeof ActionSection>, "title" | "children"> {
    current?: keyof typeof applications;
    urls: Record<keyof typeof applications, string>;
  }

  let { current, urls, ...props }: Props = $props();

  const { t } = getTranslate("common");

  function getAppUrl(app: string) {
    return urls[app as keyof typeof applications] || "#";
  }

  function cancelDisabledClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLAnchorElement;
    if (target.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  }
</script>

{#snippet appList()}
  {#each Object.entries(applications) as [app, meta] (app)}
    <li>
      <a
        onclick={cancelDisabledClick}
        aria-disabled={meta.disabled}
        data-selected={app === current}
        href={getAppUrl(app)}
      >
        <Image src={meta.logo.dark} lightModeSrc={meta.logo.light} alt={meta.name} />
      </a>
    </li>
  {/each}
{/snippet}

<ActionSection {...props} title={$t("nav.applications", "Applications")}>
  {#if props.mobile}
    <div class="mobile apps-wrapper">
      <ul>
        {@render appList()}
      </ul>
    </div>
  {:else}
    <Popover>
      {#snippet button(binding, popoverOpen, togglePopoverOpen)}
        <Button
          bind:element={binding.getRef, binding.setRef}
          icon
          color="invert"
          class="popover-button"
          onclick={togglePopoverOpen}
          aria-label={popoverOpen
            ? $t("applications.toggle.close", "Close applications menu")
            : $t("applications.toggle.open", "Open applications menu")}
        >
          <Icon icon="material-symbols:apps" font-size="1.6em" />
        </Button>
      {/snippet}
      {#snippet content(binding, popoverOpen)}
        <div
          class="popover-base popover apps-wrapper"
          bind:this={binding.getRef, binding.setRef}
          data-popover={popoverOpen}
          aria-hidden={!popoverOpen}
          data-keep-popover="true"
          role="dialog"
          aria-label={popoverOpen ? $t("applications.aria.selectionMenu", "Applications selection menu") : undefined}
        >
          <ul>
            {@render appList()}
          </ul>
        </div>
      {/snippet}
    </Popover>
  {/if}
</ActionSection>

<style>
  .popover {
    align-items: stretch;
    width: 14rem;
  }

  .apps-wrapper {
    & > ul {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-s);
      margin: 0;
      padding: 0;
      list-style: none;

      & > li {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        user-select: none;

        & > a {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          transition: linear 0s;

          cursor: pointer;

          margin: 0;
          outline: none;
          border-width: thin;
          border-style: solid;
          border-color: transparent;
          border-radius: var(--spacing-s);
          background-color: var(--background);
          padding: 0;
          color: var(--color-gray-800);
          font-size: var(--font-size-p);

          text-decoration: none;

          &[aria-disabled="true"] {
            opacity: 0.5;
            cursor: not-allowed;
          }

          &:hover:not([data-selected="true"], [aria-disabled="true"]) {
            transition: linear 0.1s;
            border-color: var(--color-gray-400);
          }

          &[data-selected="true"] {
            border-color: var(--color-primary-400);
            background-color: var(--color-gray-200);
          }

          & > :global(img) {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }

  .mobile {
    & ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-m);
    }
  }
</style>
