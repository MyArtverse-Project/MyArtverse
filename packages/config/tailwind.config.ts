import type { Config } from "tailwindcss"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

export default {
  plugins: [forms, typography]
} satisfies Partial<Config>
