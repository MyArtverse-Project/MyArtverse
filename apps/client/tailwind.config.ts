import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import myfursonaPreset from "@myfursona-internal/config/tailwind.config"

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        "open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  presets: [myfursonaPreset]
} as Config
