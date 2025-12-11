# UI Kit

Svelte component library.

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/agorastoryverse)](https://twitter.com/agorastoryverse)
[![Discord](https://img.shields.io/discord/1315240114691248138?logo=discord)](https://discord.gg/rp4Qr8cA)

<hr />

![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/a-novel/uikit)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/a-novel/uikit)

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/a-novel/uikit/main.yaml)
[![codecov](https://codecov.io/gh/a-novel/uikit/graph/badge.svg?token=MziRrPePAD)](https://codecov.io/gh/a-novel/uikit)

![Coverage graph](https://codecov.io/gh/a-novel/uikit/graphs/sunburst.svg?token=MziRrPePAD)

## Installation

> ⚠️ **Warning**: Even though the package is public, GitHub registry requires you to have a Personal Access Token
> with `repo` and `read:packages` scopes to pull it in your project. See
> [this issue](https://github.com/orgs/community/discussions/23386#discussioncomment-3240193) for more information.

Create a `.npmrc` file in the root of your project if it doesn't exist, and make sure it contains the following:

```ini
@a-novel:registry=https://npm.pkg.github.com
@a-novel-kit:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${YOUR_PERSONAL_ACCESS_TOKEN}
```

Then, install the package using pnpm:

```bash
# pnpm config set auto-install-peers true
#  Or
# pnpm config set auto-install-peers true --location project
pnpm add @a-novel/uikit
```

## Usage

Wrap the UI with the provider component.

```svelte
<!-- Load this as early as possible -->
<script lang="ts">
  import type { Snippet } from "svelte";

  import { DesignSystemComponent } from "@a-novel/uikit/ui";

  interface Props {
    // ...
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<DesignSystemComponent>
  <!-- Here goes your UI -->
  {@render children()}
</DesignSystemComponent>
```

> ⚠️ **Important**: Design system component loads the relevant theme by itself. You can override this and enforce
> a specific theme by passing the `theme` prop to it.

```svelte
<!-- Force the application theme to dark mode -->
<DesignSystemComponent theme="dark">
  {@render children()}
</DesignSystemComponent>
```

You should also import your application locales and sync them with the design system.

```svelte
<!-- Load this as early as possible. -->
<!-- You can do this in the same component where you load the theme. -->
<script lang="ts">
  import type { Snippet } from "svelte";

  import { TolgeeConfig } from "@a-novel/uikit/locales";

  import { TolgeeProvider } from "@tolgee/svelte";

  interface Props {
    // ...
    children: Snippet;
  }

  let { children }: Props = $props();

  // You may add your own namespaces.
  TolgeeConfig.addStaticData({
    "en:customNs": () => import("[PATH_TO_LOCALES]/customNs/en.json"),
    "r:customNs": () => import("[PATH_TO_LOCALES]/customNs/fr.json"),
  });
</script>

<TolgeeProvider tolgee={TolgeeConfig}>
  {@render children()}
</TolgeeProvider>
```
