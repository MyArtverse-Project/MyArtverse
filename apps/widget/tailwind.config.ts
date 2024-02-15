import type { Config } from "tailwindcss"
import myfursonaPreset from "@myfursona-internal/config/tailwind.config"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "../../packages/ui/src/**/*.{ts,tsx}", "../../node_modules/@myfursona/biro-ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        "open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  presets: [myfursonaPreset]
} satisfies Config
