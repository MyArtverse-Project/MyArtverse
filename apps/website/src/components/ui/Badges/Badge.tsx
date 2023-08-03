import type { LucideIcon } from "lucide-react"
import type { IncludeReactNode } from "@/types"

export default function Badge({
  prefixIcon,
  text,
  variants,
  size
}: IncludeReactNode<{
  variants?: "normal" | "warning" | "error" | "success"
  size?: "small" | "big"
  prefixIcon?: React.ReactElement<LucideIcon>
  text?: string
}>) {
  return (
    <div data-badge="">
      {prefixIcon}
      {text}
    </div>
  )
}
