/* eslint-disable @stylistic/padding-line-between-statements */
import type { Config } from "tailwindcss"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

const PREFIX = "bui"

const iterateColorVars = (
  baseVariable: string,
  colors: (string | string[])[]
): { [x: string]: string } => {
  const colorTmpl = `"{0}": "hsla(var(--${PREFIX}-{1}), var(${baseVariable}, 1))"`

  const fmtColorStr = (...args: string[]) => {
    return colorTmpl.replace(/{([0-9]+)}/g, (match, index) => {
      return typeof args[index] === "undefined" ? match : args[index]
    })
  }

  const parseCols = colors.map((color) => {
    if (Array.isArray(color)) return fmtColorStr(color[0], color[1])

    return fmtColorStr(color, color)
  })

  return JSON.parse(`{${parseCols}}`)
}

const GLOBAL_COLORS = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "mute",
  "subtext",
  "skeleton",
  "separator",
  "error",
  "warning",
  "info",
  "success",
  "hyperlink",
  ["error-hl", "error-highlight"],
  ["warning-hl", "warning-highlight"],
  ["info-hl", "info-highlight"],
  ["success-hl", "success-highlight"]
]
const OVERRIDE_COLORS = ["context-menu", "active"]

const customStyles = {
  unset: {
    unset: "unset"
  },
  gridResizable: {
    resizable: "minmax(0, 1fr) auto"
  }
} as const

export default {
  content: [],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: customStyles.gridResizable,
      gridTemplateColumns: customStyles.gridResizable,
      fontFamily: {
        inter: "var(--font-inter)",
        "open-sans": "var(--font-open-sans)"
      },
      colors: {
        current: "currentColor",
        ...iterateColorVars("--tw-bg-opacity", [...GLOBAL_COLORS, ...OVERRIDE_COLORS])
      },
      borderColor: {
        current: "currentColor",
        ...iterateColorVars("--tw-border-opacity", GLOBAL_COLORS)
      },
      spacing: customStyles.unset,
      inset: customStyles.unset
    }
  },
  plugins: [forms, typography]
} satisfies Config
