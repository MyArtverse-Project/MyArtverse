"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = (await cookies()).get("accessToken")?.value || ""
  const refresh = (await cookies()).get("refreshToken")?.value || ""
  const headers = new Headers(options.headers || {})
  // Send cookies
  headers.set("Cookie", `accessToken=${token};refreshToken=${refresh}`)

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access
      redirect("/login")
    }

    throw new Error(`Error: ${response.status}`)
  }

  return response.json()
}
