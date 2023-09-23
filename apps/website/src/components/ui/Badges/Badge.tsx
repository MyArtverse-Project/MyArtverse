import type { LucideIcon } from "lucide-react"

export default function Badge({
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
    <div data-badge="">
      {prefixIcon}
      {text}
    </div>
  )
}
