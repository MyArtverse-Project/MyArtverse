import type { Config } from "tailwindcss"
import twShared from "@mav/config/tailwind.config"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{ts,tsx}"
  ],
  presets: [twShared]
} satisfies Config
