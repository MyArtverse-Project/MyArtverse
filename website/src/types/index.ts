import { AdoptionStatus, ColorPalette } from "./Fursonas"

/**
 * A generic that merges custom interface with ReactNode
 */
export type ChildrenNode<T extends object = {}> = {
  children?: React.ReactNode
} & T

/**
 * Removes undefined when defining keys from an interface
 */
export type NonNullKeyFromInterface<T, K extends keyof T> = NonNullable<T[K]>

/**
 * A custom Record generic for components
 */
export type ComponentRecord<I, K extends keyof I, T = string> = {
  [P in NonNullKeyFromInterface<I, K> as Extract<P, keyof I>]: T
} & Record<PropertyKey, T>

export type Theme = "system" | "light" | "dark"
export type Variants =
  | "primary"
  | "secondary"
  | "tritery"
  | "warning"
  | "error"
  | "info"

export type { AdoptionStatus, ColorPalette }
