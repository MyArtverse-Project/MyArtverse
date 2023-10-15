import type { UrlObject } from "url"
import type { IconType } from "react-icons"

/**
 * Fursona types
 */
export type FursonaStatus =
  | "adopted"
  | "upForAdopt"
  | "owned"
  | "hidden"
  | "main"

export interface ColorPalette {
  name: string
  color: string
}

// Partial versions for built-in types
export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>
export type PartialArray<T> = Array<Partial<T>>

// Pick and Omit versions of type literals
export type PickUnion<T, U extends T> = T extends U ? T : never
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

// Complicated custom button type abomination
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
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
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

export type { FursonaStatus as AdoptionStatus }
