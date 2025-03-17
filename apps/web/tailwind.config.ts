import type { Config } from "tailwindcss"
import twShared from "@mav/config/tailwind.config"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/icons/*.{ts,tsx}",
    "../../packages/ui/components/*.{ts,tsx}"
  ],
  presets: [twShared]
} satisfies Config
