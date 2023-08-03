import { AdoptionStatus, ColorPalette } from "./Fursonas"

export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>

/**
 * A generic that merges custom interface with ReactNode
 */
export type IncludeReactNode<T extends object = {}> = {
  children?: React.ReactNode
} & T

/**
 * Works just like the `Omit` generic, but only omits literal union types
 */
export type OmitLiterals<T, U extends T> = T extends U ? never : T

export type Theme = "system" | "light" | "dark"

export type SizeLiterals = "small" | "big"
export type VariantLiterals =
  | "primary"
  | "secondary"
  | "tritery"
  | "success"
  | "warning"
  | "error"
  | "info"

export type { AdoptionStatus, ColorPalette }
