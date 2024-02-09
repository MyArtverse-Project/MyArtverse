import React from "react"

export type MapElement<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T]
export type ReactMapElement<T extends keyof React.JSX.IntrinsicElements> = T extends keyof React.JSX.IntrinsicElements
  ? React.JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, any>
    ? P
    : React.JSX.IntrinsicElements[T]
  : never

export type FursonaStatus = "adopted" | "upForAdopt" | "owned" | "hidden" | "main"
export type Theme = "system" | "light" | "dark"
export type Variants = "primary" | "secondary" | "tritery" | "success" | "warning" | "error" | "info"

// Element mapping
export interface ColorPalette {
  name: string
  color: string
}

// Partial versions for built-in types
export type PartialRecord<K extends PropertyKey, T = string> = Partial<Record<K, T>>
export type PartialArray<T> = Partial<T>[]

export type SlugRouteProps<
  Params extends object = {
    profile: string
    slug: string
  }
> = {
  params: Params
  searchParams: { [key: string]: string | string[] | undefined }
}

export type { FursonaStatus as AdoptionStatus }
