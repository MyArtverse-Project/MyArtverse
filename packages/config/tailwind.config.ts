import type { Config } from "tailwindcss"
import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"

const TW_PREFIX = "mav"
const COLORS = {
  GLOBAL: [
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
    "alert",
    "warning",
    "info",
    "success",
    "hyperlink",
    ["alert-hl", "alert-highlight"],
    ["warning-hl", "warning-highlight"],
    ["info-hl", "info-highlight"],
    ["success-hl", "success-highlight"]
  ],
  OVERRIDE: ["context-menu", "active", "active-invert"]
}

const iterateColorVars = (
  baseVariable: string,
  colors: (string | string[])[]
): { [x: string]: string } => {
  const colorTmpl = `"{0}": "hsla(var(--${TW_PREFIX}-{1}), var(${baseVariable}, 1))"`

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

const gridResizable = {
  resizable: "minmax(0, 1fr) auto"
}

export default {
  content: [],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: gridResizable,
      gridTemplateColumns: gridResizable,
      fontFamily: {
        inter: "var(--font-inter)"
      },
      colors: {
        current: "currentColor",
        ...iterateColorVars("--tw-bg-opacity", [...COLORS.GLOBAL, ...COLORS.OVERRIDE])
      },
      borderColor: {
        current: "currentColor",
        ...iterateColorVars("--tw-border-opacity", COLORS.GLOBAL)
      }
    }
  },
  plugins: [formsPlugin, typographyPlugin]
} satisfies Config
