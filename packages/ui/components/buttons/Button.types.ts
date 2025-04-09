import type { UrlObject } from "url"
import type { ReactHTMLProp, Variants } from "@mav/shared/types"
import type { ReactElement } from "react"

type ButtonVariants =
  | Exclude<Variants, "success" | "info">
  | "alert-secondary"
  | "warning-secondary"
type Positions = "left" | "center" | "right"
type Sizes = "small" | "big"

export interface ButtonProps {
  icon: NonNullable<ReactElement>
  disabled: boolean
  type: ReactHTMLProp<"button">["type"]
  variant: ButtonVariants
  position: Positions
  size: Sizes
  prefix: NonNullable<ReactElement>
  suffix: ReactElement
  href: string | UrlObject
}
