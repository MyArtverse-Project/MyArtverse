import type { FursonaStatus, ColorPalette } from "./Fursonas"

export type { FursonaStatus as AdoptionStatus, ColorPalette }

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
