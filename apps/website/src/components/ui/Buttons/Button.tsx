import Link from "next/link"

import type {
  IncludeReactNode,
  SizeLiterals as ButtonSizes,
  VariantLiterals,
  OmitUnion,
  PartialRecord
} from "@/types"
import type { LucideIcon } from "lucide-react"
import type { UrlObject } from "url"

type ButtonVariants = OmitUnion<VariantLiterals, "success">
type ButtonVariantsRecord = PartialRecord<ButtonVariants>

type ButtonSizesRecord = PartialRecord<ButtonSizes>

export default function Button({
  children,
  iconOnly,
  disabled,
  type,
  variant,
  size,
  prefixIcon,
  suffixIcon,
  href,
  /**
   * Adding this property will override the `variant` and will ignore them
   * This is behavor intended for custom styling
   */
  className,
  ...attributes
}: IncludeReactNode<{
  iconOnly?: boolean
  disabled?: boolean
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: ButtonVariants
  size?: ButtonSizes
  prefixIcon?: React.ReactElement<LucideIcon>
  suffixIcon?: React.ReactElement<LucideIcon>
  href?: string | UrlObject
}> &
  Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onClick"
    | "onContextMenu"
    | "onKeyDown"
    | "onMouseDown"
    | "onMouseOver"
    | "aria-label"
    | "formAction"
    | "className"
  >) {
  const sizes: ButtonSizesRecord = {
    small: !iconOnly ? "py-1.5 py-2 " : "p-1.5",
    big: !iconOnly ? "px-4 py-2" : "p-2"
  }

  const baseStyles =
    "flex items-center gap-x-1.5 rounded-md transition-[border,background-color] border"

  const variants: ButtonVariantsRecord = {
    primary: "border-transparent bg-color-3 hover:bg-color-4 focus:bg-color-4",
    secondary:
      "bg-transparent border-color-3 hover:bg-color-4 hover:border-color-4 focus:border-color-4",
    tritery:
      "border-transparent bg-transparent hover:bg-color-4 focus:bg-color-4",
    warning: "border-transparent",
    error: "border-transparent"
  }

  const sizeDynamic = sizes[size ?? "big"]
  const variantsDynamic = className ? className : variants[variant ?? "primary"]

  const DynamicElement = !href ? "button" : Link

  return (
    <DynamicElement
      // @ts-ignore
      href={href ?? undefined}
      type={!href ? type ?? "button" : undefined}
      aria-disabled={disabled ?? undefined}
      data-variant={className ? "custom" : variant ?? "primary"}
      className={
        className
          ? className
          : [baseStyles, sizeDynamic, variantsDynamic].join(" ")
      }
      {...attributes}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </DynamicElement>
  )
}
