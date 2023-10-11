import type { Config } from "tailwindcss"
import myfursonaPreset from "@myfursona-internal/config/tailwind.config"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  presets: [myfursonaPreset],
  plugins: [forms, typography]
} as Config
