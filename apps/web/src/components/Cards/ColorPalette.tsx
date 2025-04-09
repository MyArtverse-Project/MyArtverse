"use client"

import { cn } from "@mav/shared/utils"
import { useState } from "react"

interface ColorPaletteProps {
  palette: string[] | never[]
  width?: number | string
  height?: number | string
}

export function ColorPalette({
  palette,
  width = "100%",
  height = "30px"
}: ColorPaletteProps) {
  const [copied, setCopied] = useState(false)

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <>
      {copied && <span className="text-600 text-lg">Copied!</span>}
      <div
        className={"border-400 flex  flex-row rounded border-2 border-solid"}
        style={{ width, height }}
      >
        {palette
          ? palette
              .filter((e) => e.startsWith("#"))
              .map(
                (color, i) =>
                  color && (
                    <div
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                      className={cn(
                        "h-full w-full",
                        i === 0 && "rounded-l",
                        i === palette.length - 1 && "rounded-r"
                      )}
                      key={i}
                    />
                  )
              )
          : null}
      </div>
    </>
  )
}
