import type { Config } from "tailwindcss"
import myfursonaPreset from "@myfursona-internal/config/tailwind.config"

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [myfursonaPreset]
} as Config
