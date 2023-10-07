import type { UrlObject } from "url"
import type { FursonaStatus, ColorPalette } from "./Fursonas"
import type { IconType } from "react-icons"

export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>

export type PartialArray<T> = Array<Partial<T>>

/**
 * Equivalent of the `Pick<T, U>` generic for literal unions
 */
export type PickUnion<T, U extends T> = T extends U ? T : never

/**
 * Equivalent of the `Omit` generic for literal unions
 */
export type OmitUnion<T, U extends T> = T extends U ? never : T

export type Theme = "system" | "light" | "dark"

export type Sizes = "small" | "big"
export type Variants =
  | "primary"
  | "secondary"
  | "tritery"
  | "success"
  | "warning"
  | "error"
  | "info"

export type SlugRouteProps = {
  params: {
    profile: string
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type ButtonVariants = OmitUnion<Variants, "success">
type ExtendedDynamicButtonAnchorElement = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  | "onClick"
  | "onContextMenu"
  | "onKeyDown"
  | "onMouseDown"
  | "onMouseOver"
  | "aria-label"
  | "formAction"
  | "className"
  | "style"
>

export type BuiButtonProps = {
  children?: React.ReactNode
  iconOnly?: boolean
  disabled?: boolean
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: ButtonVariants
  position?: "left" | "center" | "right"
  size?: Sizes
  prefixIcon?: React.ReactElement<IconType>
  suffixIcon?: React.ReactElement<IconType>
  href?: string | UrlObject
  count?: number
} & ExtendedDynamicButtonAnchorElement

export type { FursonaStatus as AdoptionStatus, ColorPalette }
