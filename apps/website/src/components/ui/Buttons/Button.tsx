import { forwardRef } from "react"
import Link from "next/link"
import clsx from "clsx"
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
      /**
       * Adding this property will override the `variant` and will ignore them
       * This is behavor intended for custom styling
       */
      className,
      ...attributes
    }: BuiButtonProps,
    ref
  ) => {
    const baseStyles =
      "flex items-center gap-x-1.5 rounded-md transition-[border,background-color] border border-[2px]"

    const sizes: ButtonSizesRecord = {
      small: !iconOnly ? "px-1.5 py-1" : "p-1.5",
      big: !iconOnly ? "px-4 py-2" : "p-2"
    }

    const variants: ButtonVariantsRecord = {
      primary: "border-transparent bg-300 hover:bg-400",
      secondary: "bg-transparent border-300 hover:bg-400 hover:border-400",
      tritery: "border-transparent bg-transparent hover:bg-400",
      warning: "border-transparent",
      error: "border-transparent"
    }

    const positions = {
      left: "text-left justify-start",
      center: "text-center justify-center",
      right: "text-right justify-end"
    }

    const sizeDynamic = sizes[size ?? "big"]
    const variantsDynamic = className
      ? className
      : variants[variant ?? "primary"]
    const positionDynamic = positions[position ?? "center"]

    const DynamicElement = !href ? "button" : Link

    const joinClasses = clsx(
      baseStyles,
      sizeDynamic,
      variantsDynamic,
      positionDynamic
    )

    return (
      <DynamicElement
        ref={ref as React.LegacyRef<HTMLAnchorElement & HTMLButtonElement>}
        data-button-variant={className ? "custom" : variant ?? "primary"}
        // @ts-ignore
        href={href ?? undefined}
        type={!href ? type ?? "button" : undefined}
        aria-disabled={disabled ?? undefined}
        className={className ? className : joinClasses}
        {...attributes}
      >
        {prefixIcon}
        {children && (
          <span className="inline-block overflow-hidden select-none whitespace-nowrap overflow-ellipsis">
            {children}
          </span>
        )}
        {suffixIcon}
      </DynamicElement>
    )
  }
)

Button.displayName = "Button"

export default Button
