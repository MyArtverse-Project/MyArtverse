import { type VariantProps, cva } from "class-variance-authority"
import type { PropsWithChildren } from "react"
import type { IconType } from "react-icons"

const badgeVariants = cva(
  ["rounded-full inline-flex items-center cursor-default"],
  {
    variants: {
      variant: {
        primary: "bg-300",
        secondary: "border-2 border-300",
        warning: "bg-warning text-active-invert",
        alert: "bg-alert text-active",
        info: "bg-info text-active",
        success: "bg-success text-active-invert"
      },
      size: {
        small: "px-2 py-1 text-xs gap-x-1",
        medium: "px-3 py-1 gap-x-1.5",
        big: "px-3.5 py-1.5 !text-base gap-x-2"
      }
    },
    compoundVariants: [{ variant: "primary", size: "medium" }],
    defaultVariants: {
      variant: "primary",
      size: "medium"
    }
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  icon?: IconType
  avatar?: string
  children?: React.ReactNode
}

export function Badge(props: Partial<PropsWithChildren<BadgeProps>>) {
  const iconSizes = {
    small: 13.5,
    medium: 17,
    big: 20
  }

  return (
    <span
      data-mav-inline-badge=""
      className={badgeVariants({ variant: props.variant, size: props.size })}
    >
      {props.icon && (
        <props.icon
          className="flex-shrink-0"
          size={iconSizes[props.size ?? "medium"]}
        />
      )}
      {props.children}
    </span>
  )
}
