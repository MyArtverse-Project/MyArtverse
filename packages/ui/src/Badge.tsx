import * as React from "react"
import type { LucideIcon } from "lucide-react"

export function Badge({
  prefixIcon,
  text,
  variants,
  size
}: {
  variants?: "normal" | "warning" | "error" | "success"
  size?: "small" | "big"
  prefixIcon?: React.ReactElement<LucideIcon>
  text?: string
}) {
  return (
    <div id="badge">
      {prefixIcon}
      {text}
    </div>
  )
}
