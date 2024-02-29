import { cookies } from "next/headers"

type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

export const apiWithAuth = (route: string, method: APIMethods) => {
  const cookiesHeaders = cookies()
  const accessToken = cookiesHeaders.get("accessToken").value
  console.log(accessToken)
  let data, response: Promise<Response>
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL
  try {
    response = fetch(`${endpoint}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      cache: "no-cache",
      credentials: "include"
    }).then((res) => {
      if (!res.ok) {
        const refreshed = refreshToken()
        if (refreshed) {
          response = fetch(`${endpoint}${route}`, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Cookie: `accessToken=${accessToken}`
            },
            credentials: "include"
          }).then((res) => {
            console.log(res.status)
            if (!res.ok) {
              throw new Error("Unable to Provide data")
            }
            return res
          })
        } else {
          throw new Error("Unauthorized")
        }
      }
      return res
    })

    data = response.then((res) => {
      return res.json()
    })

    return { data: data }
  } catch (err) {
    throw new Error(err)
  }
}

export const refreshToken = async () => {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL
  const route = "/v1/auth/refresh-token"
  const cookiesHeaders = cookies()
  const refreshToken = cookiesHeaders.get("refreshToken").value
  try {
    const response = await fetch(`${endpoint}${route}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    if (response.ok) {
      return true
    }

    return false
  } catch (err) {
    console.error(err)
    return false
  }
}
