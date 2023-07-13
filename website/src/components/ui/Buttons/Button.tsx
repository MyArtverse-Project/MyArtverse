import type { ButtonHTMLAttributes, ReactElement } from "react"
import type { LucideIcon } from "lucide-react"
import type { ChildrenNode, ComponentRecord, Variants } from "@/types"

interface ButtonProps
  extends ChildrenNode,
    ButtonHTMLAttributes<HTMLButtonElement> {
  iconOnly?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: Variants
  size?: "small" | "big"
  className?: string
  ["aria-label"]?: string
  /**
   * Accepts a Lucide Icon on the left side
   */
  prefixIcon?: ReactElement<LucideIcon>
  /**
   * Accepts a Lucide Icon on the right side
   */
  suffixIcon?: ReactElement<LucideIcon>
}

type ButtonRecord<K extends keyof ButtonProps> = ComponentRecord<ButtonProps, K>

export default function Button(props: ButtonProps) {
  const {
    children,
    iconOnly,
    disabled,
    type,
    variant,
    size,
    prefixIcon,
    suffixIcon,
    className,
    "aria-label": ariaLabel,
    ...attributes
  } = props

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

  const baseStyles =
    "flex items-center gap-x-1.5 rounded-md transition-[border,background-color]"

  const mergeClass = !className
    ? [baseStyles, sizeDynamic, variantsDynamic]
    : [baseStyles, className]

  return (
    <button
      type={type ?? undefined}
      className={mergeClass.join(" ")}
      aria-label={ariaLabel}
      {...attributes}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  )
}
