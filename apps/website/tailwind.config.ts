import type { Config } from "tailwindcss"
import myfursonaPreset from "@myfursona-internal/config/tailwind.config"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../node_modules/@myfursona/biro-ui/src/**/*.{ts,tsx}"
  ],
  presets: [myfursonaPreset]
} as Config
