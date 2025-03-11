import type { Config } from "tailwindcss"
import twShared from "@mav/config/tailwind.config"

export default {
  content: ["/components/**/*.{ts,tsx}", "/icons/**/*.{ts,tsx}"],
  presets: [twShared]
} satisfies Config
