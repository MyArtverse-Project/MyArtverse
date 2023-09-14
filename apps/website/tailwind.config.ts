import type { Config } from "tailwindcss"
import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        "open-sans": "var(--font-open-sans)"
      },
      colors: {
        // TODO refactor this into its own function
        // ! global
        warning: "var(--bui-warning)",
        info: "var(--bui-info)",
        error: "var(--bui-error)",
        success: "var(--bui-success)",
        current: "currentColor",
        100: "hsla(var(--bui-100), var(--tw-bg-opacity, 1))",
        200: "hsla(var(--bui-200), var(--tw-bg-opacity, 1))",
        300: "hsla(var(--bui-300), var(--tw-bg-opacity, 1))",
        400: "hsla(var(--bui-400), var(--tw-bg-opacity, 1))",
        500: "hsla(var(--bui-500), var(--tw-bg-opacity, 1))",
        600: "hsla(var(--bui-600), var(--tw-bg-opacity, 1))",
        700: "hsla(var(--bui-700), var(--tw-bg-opacity, 1))",
        mute: "hsla(var(--bui-mute), var(--tw-bg-opacity, 1))",
        subtext: "hsla(var(--bui-subtext), var(--tw-bg-opacity, 0.65))",
        skeleton: "hsla(var(--bui-skeleton), var(--tw-bg-opacity, 1))",
        separator: "hsla(var(--bui-separator), var(--tw-bg-opacity, 1))",
        "error-hl": "hsla(var(--bui-error-highlight), var(--tw-bg-opacity, 1))",
        "warning-hl":
          "hsla(var(--bui-warning-highlight), var(--tw-bg-opacity, 1))",
        "info-hl": "hsla(var(--bui-info-highlight, var(--tw-bg-opacity, 1)))",
        // ! overrides
        "context-menu": "var(--bui-context-menu)",
        active: "var(--bui-active)"
      },
      borderColor: {
        warning: "var(--bui-warning)",
        info: "var(--bui-info)",
        error: "var(--bui-error)",
        success: "var(--bui-success)",
        current: "currentColor",
        100: "hsla(var(--bui-100), var(--tw-border-opacity, 1))",
        200: "hsla(var(--bui-200), var(--tw-border-opacity, 1))",
        300: "hsla(var(--bui-300), var(--tw-border-opacity, 1))",
        400: "hsla(var(--bui-400), var(--tw-border-opacity, 1))",
        500: "hsla(var(--bui-500), var(--tw-border-opacity, 1))",
        600: "hsla(var(--bui-600), var(--tw-border-opacity, 1))",
        700: "hsla(var(--bui-700), var(--tw-border-opacity, 1))",
        mute: "hsla(var(--bui-mute), var(--tw-border-opacity, 1))",
        subtext: "hsla(var(--bui-subtext), var(--tw-border-opacity, 0.65))",
        skeleton: "hsla(var(--bui-skeleton), var(--tw-border-opacity, 1))",
        separator: "hsla(var(--bui-separator), var(--tw-border-opacity, 1))",
        "error-hl":
          "hsla(var(--bui-error-highlight), var(--tw-border-opacity, 1))",
        "warning-hl":
          "hsla(var(--bui-warning-highlight), var(--tw-border-opacity, 1))",
        "info-hl":
          "hsla(var(--bui-info-highlight, var(--tw-border-opacity, 1)))"
      },
      spacing: {
        unset: "unset"
      },
      inset: {
        unset: "unset"
      },
      width: {
        unset: "unset"
      },
      height: {
        unset: "unset"
      }
    }
  },
  plugins: [formsPlugin, typographyPlugin]
}

export default config
