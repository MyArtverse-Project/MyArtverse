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
        warning: "var(--warning)",
        info: "var(--info)",
        error: "var(--error)",
        success: "var(--success)",
        text: "var(--text)",
        background: "var(--background)",
        "text-icons": "var(--text-icons)",
        emphasis: "var(--text-emphasis)",
        "color-active": "var(--active-state)",
        "color-2": "var(--modal)",
        "color-3": "var(--button-idle-chips)",
        "color-4": "var(--dropdowns-text-field)",
        mute: "var(--mute)",
        subtext: "var(--subtext)",
        separator: "var(--menu-separator)",
        "error-bg": "var(--error-background)",
        "warning-bg": "var(--warning-background)",
        "info-bg": "var(--info-background)"
      },
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ]
}
