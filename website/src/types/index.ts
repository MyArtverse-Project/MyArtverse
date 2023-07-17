import { AdoptionStatus, ColorPalette } from "./Fursonas"

/**
 * A generic that merges custom interface with ReactNode
 */
export type IncludeReactNode<T extends object = {}> = {
  children?: React.ReactNode
} & T

export type Theme = "system" | "light" | "dark"
export type Variants =
  | "primary"
  | "secondary"
  | "tritery"
  | "warning"
  | "error"
  | "info"

export type { AdoptionStatus, ColorPalette }
