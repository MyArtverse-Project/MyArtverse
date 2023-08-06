/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // global
        warning: "var(--bui-warning)",
        info: "var(--bui-info)",
        error: "var(--bui-error)",
        success: "var(--bui-success)",
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
        // prettier-ignore
        "warning-hl": "hsla(var(--bui-warning-highlight), var(--tw-bg-opacity, 1))",
        "info-hl": "hsla(var(--bui-info-highlight, var(--tw-bg-opacity, 1)))",
        // ! overrides
        "context-menu": "var(--bui-context-menu)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
