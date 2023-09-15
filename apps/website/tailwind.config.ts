import type { Config } from "tailwindcss"
import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"

import kuroTw from "@myfursona-internal/config/tailwind.config"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  presets: [kuroTw],
  plugins: [formsPlugin, typographyPlugin]
}

export default config
