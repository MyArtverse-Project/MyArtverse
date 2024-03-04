import { cookies } from "next/headers"
import type { UserType } from "@/types/users"

type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

export const apiWithAuth = async (route: string, method: APIMethods) => {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081"

  const makeRequest = async () => {
    const cookiesHeaders = cookies()
    if (!cookiesHeaders.has("accessToken") || !cookiesHeaders.has("refreshToken")) {
      throw new Error("Unauthorized")
    }
    const accessToken = cookiesHeaders.get("accessToken").value
    const refreshToken = cookiesHeaders.get("refreshToken").value
    return fetch(`${endpoint}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      cache: "no-cache",
      credentials: "include"
    })
  }

  return makeRequest()
    .then((res) => {
      if (res.ok) return res.json()
      if (res.status === 401) {
        return refreshToken().then((refreshed) => {
          if (!refreshed) throw new Error("Unauthorized")
          return makeRequest().then((res) => {
            console.log(res.status)
            if (!res.ok) throw new Error("Unable to provide data")
            return res.json()
          })
        })
      }

      console.log(res.status)
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const refreshToken = () => {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081"
  const cookiesHeaders = cookies()
  if (!cookiesHeaders.has("refreshToken")) {
    return Promise.resolve(false)
  }
  const refreshToken = cookiesHeaders.get("refreshToken").value
  return fetch(`${endpoint}/v1/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`
    },
    body: JSON.stringify({}),
    credentials: "include"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      return true
    })
    .catch((error) => {
      console.error("Error in refreshToken:", error)
      return false
    })
}

export const fetchUserData = () => {
  const data = apiWithAuth(`/v1/profile/me`, "GET")
    .then(() => {
      return data
    })
    .catch((err) => {
      return null
    })
  return data as UserType | null
}
