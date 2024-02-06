import type { UrlObject } from "url"
import type { IconType } from "react-icons"

export type FursonaStatus = "adopted" | "upForAdopt" | "owned" | "hidden" | "main"

export interface ColorPalette {
  name: string
  color: string
}

// Partial versions for built-in types
export type PartialRecord<K extends PropertyKey, T = string> = Partial<Record<K, T>>
export type PartialArray<T> = Array<Partial<T>>

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

export type ButtonVariants = Exclude<Variants, "success" | "info">

type Positions = "left" | "center" | "right"

type AdditionalButtonAndLinkProps =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>

// Complicated custom button type abomination
export type BuiButtonProps = Partial<{
  children: React.ReactNode
  iconOnly: boolean
  disabled: boolean
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant: ButtonVariants | "error-secondary"
  position: Positions
  size: Sizes
  prefixIcon: React.ReactElement<IconType>
  suffixIcon: React.ReactElement<IconType>
  href: string | UrlObject
  count: number
  override: boolean
}> &
  AdditionalButtonAndLinkProps

export type { FursonaStatus as AdoptionStatus }
