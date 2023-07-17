import type { ReactElement } from "react"
import type { LucideIcon } from "lucide-react"
import type { IncludeReactNode } from "@/types"

export default function Badge({
  prefixIcon,
  text,
  variants,
  className
}: IncludeReactNode<{
  className?: string
  variants?: "normal" | "warning" | "error" | "success"
  prefixIcon?: ReactElement<LucideIcon>
  text?: string
}>) {
  return (
    <div className={className}>
      {prefixIcon}
      {text}
    </div>
  )
}
