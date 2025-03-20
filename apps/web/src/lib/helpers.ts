import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { BACKEND_URL } from "@/utils/constants"
import { cookies } from "next/headers"

type SupportedAPIMethods = "GET" | "POST" | "DELETE" | "PUT"

const endpoint = BACKEND_URL

export const getCookies = async () => {
  const cookiesHeaders = cookies()

  return new Promise((resolve) => {
    resolve(cookiesHeaders)
  })
}

export const apiWithAuth = async <Data>(
  method: SupportedAPIMethods,
  route: string
): Promise<Data> => {
  const makeRequest = async () => {
    const cookiesHeaders = (await getCookies()) as ReadonlyRequestCookies

    const accessToken = cookiesHeaders.get("accessToken")?.value
    const refreshToken = cookiesHeaders.get("refreshToken")?.value

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

export const apiWithoutAuth = async <Data>(
  method: SupportedAPIMethods,
  route: string,
  body?: object
): Promise<Data> => {
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
      throw new Error(`Unable to provide data ${res.status}`)
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const refreshToken = async () => {
  const cookiesHeaders = (await getCookies()) as ReadonlyRequestCookies
  if (!cookiesHeaders.has("refreshToken")) {
    return Promise.resolve(false)
  }

  const refreshToken = cookiesHeaders.get("refreshToken")!.value

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
    .catch(() => {
      return false
    })
}
