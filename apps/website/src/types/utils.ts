/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"

export type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

export type PartialRecord<K extends PropertyKey, T = string> = Partial<Record<K, T>>
export type PartialArray<T> = Partial<T>[]

export type LinkedString = `/${string}` | `https://${string}`

type SearchParams = { [key: string]: string | string[] | undefined }

export type SlugRouteProps<
  Params extends object = {
    profile: string
    slug: string
  }
> = {
  params: Params
  searchParams?: SearchParams
}

type IntrinsicElements = React.JSX.IntrinsicElements

export type MapElement<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T]
export type ReactMapElement<T extends keyof IntrinsicElements> = IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, any> ? P : IntrinsicElements[T]

export type Theme = "system" | "light" | "dark"
export type Variants = "primary" | "secondary" | "tritery" | "success" | "warning" | "error" | "info"

export type Visibility = "public" | "private" | "secret" | "unlisted"
export type StatusIndicator = "blocked" | "failed" | "canceled" | "pending" | "success" | "finished"

export type FormFieldWithErrors<T extends object> = Partial<
  T & {
    [K in keyof T as `${string & K}ErrorMsg`]: string | null
  }
>
