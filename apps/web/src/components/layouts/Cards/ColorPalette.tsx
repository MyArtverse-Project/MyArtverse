"use client"

import { cn } from "@mav/shared/utils"
import { useState } from "react"

interface ColorPaletteProps {
  palette: string[] | never[]
  width?: number | string
  height?: number | string
}

function normalizeColor(color: string) {
  const trimmed = color.trim()
  if (!trimmed) return null
  if (trimmed.startsWith("#")) return trimmed
  if (/^[0-9A-Fa-f]{3}$/.test(trimmed) || /^[0-9A-Fa-f]{6}$/.test(trimmed)) {
    return `#${trimmed}`
  }
  return null
}

export default function ColorPalette({
  palette,
  width = "100%",
  height = "30px",
}: ColorPaletteProps) {
  const [copied, setCopied] = useState(false)

  const colors = palette
    .map((color) => normalizeColor(color))
    .filter((color): color is string => !!color)

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div className="space-y-1">
      {copied ? (
        <span className="text-muted-foreground text-xs">Copied!</span>
      ) : null}
      <div
        className="border-border flex flex-row overflow-hidden rounded border-2 border-solid"
        style={{ width, height }}
        aria-label={
          colors.length > 0
            ? `Color palette: ${colors.join(", ")}`
            : "Color palette not set"
        }
      >
        {colors.length > 0 ? (
          colors.map((color, index) => (
            <button
              key={`${color}-${index}`}
              type="button"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color)}
              className={cn(
                "h-full min-w-0 flex-1 cursor-pointer border-0 p-0",
                index === 0 && "rounded-l",
                index === colors.length - 1 && "rounded-r"
              )}
              aria-label={`Copy color ${color}`}
            />
          ))
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "bg-muted/70 h-full min-w-0 flex-1",
                index === 0 && "rounded-l",
                index === 4 && "rounded-r"
              )}
            />
          ))
        )}
      </div>
    </div>
  )
}
