import { ButtonHTMLAttributes, ReactElement } from "react"
import type { LucideIcon } from "lucide-react"
import type { ChildrenNode, ComponentRecord } from "@/types"

interface ButtonProps extends ChildrenNode {
  iconOnly?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: "primary" | "secondary" | "error" | "warning"
  size?: "small" | "big"
  className?: string
  /**
   * Accepts a Lucide Icon on the left side
   */
  prefixIcon?: ReactElement<LucideIcon>
  /**
   * Accepts a Lucide Icon on the right side
   */
  suffixIcon?: ReactElement<LucideIcon>
}

// prettier-ignore
type ButtonRecord<P extends keyof ButtonProps, T = string> = ComponentRecord<ButtonProps, P, string, T>

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
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizes: ButtonRecord<"size"> = {
    small: !iconOnly ? "py-1.5 py-2 " : "p-1.5",
    big: !iconOnly ? "px-4 py-2" : "p-2"
  }

  const variants: ButtonRecord<"variant"> = {
    primary: "bg-red-100 hover:bg-red-200 focus:bg-red-200",
    secondary: "bg-transparent hover:bg-red-200 focus:bg-red-200",
    warning: "",
    error: ""
  }

  const sizeDynamic = sizes[size ?? "big"]
  const variantsDynamic = variants[variant ?? "primary"]

  const baseStyles = "flex items-center gap-x-1.5 rounded-md"

  const mergeClass = !className
    ? [baseStyles, sizeDynamic, variantsDynamic]
    : [baseStyles, className]

  return (
    <button
      data-mf-button=""
      type={type ?? "button"}
      className={mergeClass.join(" ")}
      {...attributes}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  )
}
