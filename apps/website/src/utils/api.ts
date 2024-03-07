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
      credentials: "include",
    })
  }

  return makeRequest()
    .then((res) => {
      if (res.ok) return res.json()
      if (res.status === 401) {
        return refreshToken().then((refreshed) => {
          if (!refreshed) throw new Error("Unauthorized")
          return makeRequest().then((res) => {
            if (!res.ok) throw new Error("Unable to provide data")
            return res.json()
          })
        })
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const apiWithoutAuth = async (route: string, method: APIMethods, body?: any) => {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081"
  return fetch(`${endpoint}${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-cache",
    credentials: "include"
  })
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error("Unable to provide data")
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
    credentials: "include",
    cache: "no-cache"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      return true
    })
    .catch((error) => {
      return false
    })
}

export const fetchUserData = async () => {
  const data = await apiWithAuth(`/v1/profile/me`, "GET")
  return data as UserType;
}

export const fetchUser = async (handle: string) => {
  const data = await apiWithoutAuth(`/v1/profile/${handle}`, "GET")
  return data as UserType
}