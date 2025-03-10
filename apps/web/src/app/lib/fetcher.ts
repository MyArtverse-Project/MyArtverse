"use server"

import { cookies } from "next/headers"

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = (await cookies()).get("accessToken")?.value || ""
  const headers = new Headers(options.headers || {})
  // Send cookies
  headers.set("Cookie", `accessToken=${token}`)

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized")
    }

    throw new Error(`Error: ${response.status}`)
  }

  return response.json()
}
