import cn from "@/utils/cn"
import { type VariantProps, cva } from "class-variance-authority"
import type { IconType } from "react-icons"

const badgeStyles = cva(["inline-flex items-center border border-solid rounded-full"], {
  variants: {
    variant: {
      default: "border-400 text-700 bg-100",
      error: "border-error text-error bg-error-hl",
      warning: "border-warning text-warning bg-warning-hl",
      info: "border-info text-info bg-info-hl"
    },
    size: {
      small: "px-2.5 py-0.5",
      normal: "px-3 py-1 gap-x-1.5",
      big: "px-3.5 py-1"
    }
  },
  compoundVariants: [{ size: "normal", variant: "default" }],
  defaultVariants: {
    variant: "default",
    size: "normal"
  }
})

export default function Badge({
  children,
  prefixIcon,
  size,
  variant = "default",
  className
}: {
  children: React.ReactNode
  prefixIcon?: React.ReactElement<IconType>
  className?: string
} & VariantProps<typeof badgeStyles>) {
  return (
    <div id="badge" className={badgeStyles({ variant, size })}>
      {prefixIcon}
      <span
        className={cn("font-inter", size !== "big" ? "text-xs" : "text-sm", className)}
      >
        {children}
      </span>
    </div>
  )
}
