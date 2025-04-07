import twShared from "@mav/config/tailwind.config"
import type { Config } from "tailwindcss"

export default {
  content: ["/components/**/*.{ts,tsx}", "/icons/**/*.{ts,tsx}"],
  presets: [twShared]
} satisfies Config
