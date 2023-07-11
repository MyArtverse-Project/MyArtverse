import { ReactElement } from "react"
import { LucideIcon } from "lucide-react"
import type { ChildrenNode } from "@/types"

interface ChipProps extends ChildrenNode {
  prefixIcon?: ReactElement<LucideIcon>
  text?: string
  variants?: "normal" | "warning" | "error" | "success"
  className?: string
}

export default function Chip({
  prefixIcon,
  text,
  variants,
  className
}: ChipProps) {
  return (
    <div data-chip-component className="">
      {prefixIcon}
      {text}
    </div>
  )
}
