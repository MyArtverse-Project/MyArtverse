import type React from "react"
import { Artwork, Character } from "./characters"
import { UserType } from "./users"

export type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>
export type PartialArray<T> = Partial<T>[]

export type LinkedString = `/${string}` | `http://${string}` | `https://${string}`

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

export type MapElement<T extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[T]
export type ReactMapElement<T extends keyof IntrinsicElements> =
  IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, unknown>
    ? P
    : IntrinsicElements[T]

export type Theme = "system" | "light" | "dark"
export type Variants =
  | "primary"
  | "secondary"
  | "tritery"
  | "success"
  | "warning"
  | "error"
  | "info"

export type Visibility = "public" | "private" | "secret" | "unlisted"
export type StatusIndicator =
  | "blocked"
  | "failed"
  | "canceled"
  | "pending"
  | "success"
  | "finished"

export type FormFieldWithErrors<T extends object> = Partial<
  T & {
    [K in keyof T as `${string & K}ErrorMsg`]: string | null
  }
>

export interface SearchResult {
  user: UserType[]
  artwork: Artwork[]
  character: Character[]
}
