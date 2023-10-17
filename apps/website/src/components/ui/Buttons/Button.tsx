import { forwardRef } from "react"
import Link from "next/link"
import clsx from "clsx"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type {
  BuiButtonProps,
  Sizes as ButtonSizes,
  PartialRecord,
  ButtonVariants
} from "@/types"

type ButtonVariantsRecord = PartialRecord<ButtonVariants>
type ButtonSizesRecord = PartialRecord<ButtonSizes>

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
      /**
       * Adding this property will override the `variant` and will ignore them
       * This is behavor intended for custom styling
       */
      className,
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
            primary: ["border-transparent bg-300 hover:bg-400"],
            secondary: [
              "bg-transparent border-300 hover:bg-400 hover:border-400"
            ],
            tritery: ["border-transparent bg-transparent hover:bg-400"],
            warning: ["bg-transparent"],
            error: ["bg-transparent"]
          },
          size: {
            small: !iconOnly ? ["px-2.5 py-1"] : "p-1.5",
            medium: !iconOnly ? ["px-4 py-2"] : "p-2",
            big: !iconOnly ? ["px-5 py-2.5"] : "p-3"
          },
          positions: {
            left: ["text-left justify-start"],
            center: ["text-center justify-center"],
            right: ["text-right justify-end"]
          }
        },
        compoundVariants: [
          { intent: "primary", size: "medium", class: "uppercase" }
        ],
        defaultVariants: {
          intent: "primary",
          size: "medium"
        }
      }
    )
    const baseStyles = ""

    const sizes: ButtonSizesRecord = {
      small: !iconOnly ? "px-2.5 py-1" : "p-1.5",
      big: !iconOnly ? "px-4 py-2" : "p-2"
    }

    const variants: ButtonVariantsRecord = {
      primary: "",
      secondary: "",
      tritery: "",
      warning: "",
      error: ""
    }

    const positions = {}

    const sizeDynamic = sizes[size ?? "big"]
    const variantsDynamic = className
      ? className
      : variants[variant ?? "primary"]
    const positionDynamic = positions[position ?? "center"]

    const DynamicElement = !href ? "button" : Link

    return (
      <DynamicElement
        ref={ref as React.LegacyRef<HTMLAnchorElement & HTMLButtonElement>}
        data-button-variant-debug={className ? "custom" : variant ?? "primary"}
        // @ts-ignore
        href={href ?? undefined}
        type={!href ? type ?? "button" : undefined}
        aria-disabled={disabled ?? undefined}
        className={clsx(
          className
            ? className
            : [baseStyles, sizeDynamic, variantsDynamic, positionDynamic]
        )}
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
