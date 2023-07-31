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
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: Variants
  size?: ButtonSizes
  className?: string
  prefixIcon?: React.ReactElement<LucideIcon>
  suffixIcon?: React.ReactElement<LucideIcon>
}> &
  Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "onContextMenu" | "onKeyDown" | "onMouseDown" | "onMouseOver"
  >) {
  const sizes: Record<ButtonSizes, string> = {
    small: !iconOnly ? "py-1.5 py-2 " : "p-1.5",
    big: !iconOnly ? "px-4 py-2" : "p-2"
  }

  const variants: Partial<Record<Variants, string>> = {
    primary: "bg-color-3 hover:bg-color-4 focus:bg-color-4",
    secondary:
      "bg-transparent border border-color-3 hover:border-color-3 focus:border-color-3",
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
      className={mergeClass.join(" ")}
      type={type ?? undefined}
      {...attributes}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  )
}
