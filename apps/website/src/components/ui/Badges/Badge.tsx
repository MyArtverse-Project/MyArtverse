import { type VariantProps, cva } from "class-variance-authority"
import type { IconType } from "react-icons"

const badgeStyles = cva(["inline-flex items-center border border-solid"], {
  variants: {
    intent: {
      default: "border-100 text-100 bg-100",
      error: "border-error text-error bg-error-hl",
      warning: "border-warning text-warning bg-warning-hl",
      info: "border-info text-info bg-info-hl"
    },
    size: {
      small: "px-2 py-1 mx-1 rounded-md",
      normal: "px-2.5 py-2 mx-2 gap-x-1.5 rounded-md",
      thicc: "px-3.5 py-3 mx-3.5 rounded-lg"
    }
  },
  compoundVariants: [{ size: "normal", intent: "default" }],
  defaultVariants: {
    intent: "default",
    size: "normal"
  }
})

export default function Badge({
  label,
  prefixIcon,
  size,
  intent = "default"
}: {
  label: string
  prefixIcon: React.ReactElement<IconType>
} & VariantProps<typeof badgeStyles>) {
  return (
    <div className={badgeStyles({ size, intent })}>
      {prefixIcon}
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}
