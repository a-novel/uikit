import { DEFAULT_LNG, LNG } from "../src/lib/const";
import { DesignSystemComponent } from "../src/lib/ui";
import "../src/lib/ui/designSystem.css";
import "./preview.css";

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
  brandTitle: "A-Novel",
};

themes.light = {
  ...themes.light,
  appBg: "#FFFFFF",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  fontBase: "Arimo, sans-serif",
  brandTitle: "A-Novel",
};

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: LNG.EN, title: "English" },
        { value: LNG.FR, title: "Francais" },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "ipad",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
    (_, params) => {
      return {
        Component: DesignSystemComponent,
        props: {
          get theme() {
            return params.globals.theme || "dark";
          },
          set theme(value: string) {
            params.globals.theme = value;
          },

          get locale() {
            return params.globals.locale || DEFAULT_LNG;
          },
          set locale(value: string) {
            params.globals.locale = value;
          },
        },
      };
    },
  ],
};

export default preview;
