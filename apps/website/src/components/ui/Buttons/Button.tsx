import Link from "next/link"
import { forwardRef } from "react"
import type { BuiButtonProps } from "@/types"
import { cva } from "class-variance-authority"

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
            secondary: "bg-transparent border-300 hover:bg-400 hover:border-400",
            tritery: "border-transparent bg-transparent hover:bg-400",
            warning: "bg-transparent",
            error: "bg-error text-active hover:bg-opacity-70 border-transparent",
            "error-secondary": "border-error hover:border-opacity-50"
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
        role={!href ? undefined : "button"}
        className={buttonVars({
          positions: position,
          intent: variant,
          size
        })}
        {...attributes}
      >
        {prefixIcon}
        {children && (
          <span className="inline-block select-none overflow-hidden overflow-ellipsis whitespace-nowrap">
            {children}
            {count && (
              <span className="bg-100 text-700 ml-1.5 rounded-xl p-2 font-semibold">
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
