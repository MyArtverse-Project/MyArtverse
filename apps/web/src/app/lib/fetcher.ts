"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
  redirectOnUnauthorized: boolean = true
): Promise<T> => {
  const token = (await cookies()).get("accessToken")?.value || ""
  const refresh = (await cookies()).get("refreshToken")?.value || ""
  const headers = new Headers(options.headers || {})
  headers.set("Cookie", `accessToken=${token};refreshToken=${refresh}`)

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers
  })

  if (!response.ok) {
    if (response.status === 401) {
      if (redirectOnUnauthorized) {
        redirect("/login")
      }

      // Quietly return null if we don't want to redirect
      return null as unknown as T
    }

    throw new Error(`Error: ${response.status}`)
  }

  return response.json()
}
