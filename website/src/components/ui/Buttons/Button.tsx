import type { ButtonHTMLAttributes, ReactElement } from "react"
import type { LucideIcon } from "lucide-react"
import type { IncludeReactNode, Variants } from "@/types"

type ButtonSizes = "small" | "big"

export default function Button({
  children,
  iconOnly,
  disabled,
  type,
  variant,
  size,
  prefixIcon,
  suffixIcon,
  className,
  ...attributes
}: IncludeReactNode<{
  iconOnly?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: Variants
  size?: ButtonSizes
  className?: string
  prefixIcon?: ReactElement<LucideIcon>
  suffixIcon?: ReactElement<LucideIcon>
}> &
  ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizes: Record<ButtonSizes, string> = {
    small: !iconOnly ? "py-1.5 py-2 " : "p-1.5",
    big: !iconOnly ? "px-4 py-2" : "p-2"
  }

  const variants: Partial<Record<Variants, string>> = {
    primary: "bg-red-100 hover:bg-red-200 focus:bg-red-200",
    secondary: "bg-transparent hover:bg-red-200 focus:bg-red-200",
    tritery: "",
    warning: "",
    error: ""
  }

  const sizeDynamic = sizes[size ?? "big"]
  const variantsDynamic = variants[variant ?? "primary"]

  const baseStyles =
    "flex items-center gap-x-1.5 rounded-md transition-[border,background-color]"

  const mergeClass = !className
    ? [baseStyles, sizeDynamic, variantsDynamic]
    : [baseStyles, className]

  return (
    <button
      type={type ?? undefined}
      className={mergeClass.join(" ")}
      {...attributes}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  )
}
