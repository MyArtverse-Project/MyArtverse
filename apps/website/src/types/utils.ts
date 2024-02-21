/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

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

export type MapElement<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T]
export type ReactMapElement<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, any> ? P : React.JSX.IntrinsicElements[T]

export type Theme = "system" | "light" | "dark"
export type Variants = "primary" | "secondary" | "tritery" | "success" | "warning" | "error" | "info"
