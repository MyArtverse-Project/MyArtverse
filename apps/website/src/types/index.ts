import type { AdoptionStatus, ColorPalette } from "./Fursonas"

export type {
  AdoptionStatus,
  ColorPalette
}

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
 * Equivalent of the `Pick<T, U>` generic for literal unions
 */
export type PickUnion<T, U extends T> = T extends U ? T : never

/**
 * Equivalent of the `Omit` generic for literal unions
 */
export type OmitUnion<T, U extends T> = T extends U ? never : T

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
