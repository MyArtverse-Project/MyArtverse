import { forwardRef } from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"
import type { BuiButtonProps } from "@/types"

const Button = forwardRef(
  (
    {
      children,
      iconOnly,
      disabled,
      type,
      variant,
      size,
      position,
      prefixIcon,
      suffixIcon,
      href,
      count,
      ...attributes
    }: BuiButtonProps,
    ref
  ) => {
    const buttonVars = cva(
      [
        "flex items-center gap-x-1.5 rounded-md transition-[border,background-color] border-[2px]"
      ],
      {
        variants: {
          intent: {
            primary: "border-transparent bg-300 hover:bg-400",
            secondary:
              "bg-transparent border-300 hover:bg-400 hover:border-400",
            tritery: "border-transparent bg-transparent hover:bg-400",
            warning: "bg-transparent",
            error: "bg-transparent"
          },
          size: {
            small: !iconOnly ? "px-2.5 py-1" : "p-1.5",
            medium: !iconOnly ? "px-4 py-2" : "p-2",
            big: !iconOnly ? "px-5 py-2.5" : "p-3"
          },
          positions: {
            left: "text-left justify-start",
            center: "text-center justify-center",
            right: "text-right justify-end"
          }
        },
        compoundVariants: [{ intent: "primary", size: "medium" }],
        defaultVariants: {
          intent: "primary",
          size: "medium"
        }
      }
    )

    const DynamicElement = !href ? "button" : Link

    return (
      <DynamicElement
        ref={ref as React.LegacyRef<HTMLAnchorElement & HTMLButtonElement>}
        // @ts-ignore
        href={href ?? undefined}
        type={!href ? type ?? "button" : undefined}
        aria-disabled={disabled ?? undefined}
        className={buttonVars({
          positions: position,
          intent: variant
        })}
        {...attributes}
      >
        {prefixIcon}
        {children && (
          <span className="inline-block overflow-hidden select-none whitespace-nowrap overflow-ellipsis">
            {children}
            {count && (
              <span className="ml-1.5 font-semibold bg-100 text-700 rounded-xl p-2">
                {count}
              </span>
            )}
          </span>
        )}
        {suffixIcon}
      </DynamicElement>
    )
  }
)

Button.displayName = "Button"

export default Button
