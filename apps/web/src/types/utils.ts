import type React from "react"
import { Artwork, Character } from "./characters"
import { UserType } from "./users"

export type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>

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

export type MapElement<T extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[T]

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
