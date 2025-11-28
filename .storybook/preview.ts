import { DesignSystemComponent } from "../src/lib/ui";
import "../src/lib/ui/designSystem.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/sveltekit";
import { themes } from "storybook/theming";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

themes.dark = {
  ...themes.dark,
  appBg: "#000000",
  appContentBg: "#000000",
  appPreviewBg: "#000000",
  fontBase: "Arimo, sans-serif",
  brandTitle: "A-Novel"
};

themes.light = {
  ...themes.light,
  appBg: "#FFFFFF",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  fontBase: "Arimo, sans-serif",
  brandTitle: "A-Novel"
};

console.log("AYOOOOOOOOOOOOOOOO");

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "ipad"
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "",
        dark: "dark"
      },
      defaultTheme: "dark",
      attributeName: "data-theme"
    }),
    (_, params) => {
      return {
        Component: DesignSystemComponent,
        props: { theme: params.globals.theme || "dark" }
      };
    }
  ]
};

export default preview;
