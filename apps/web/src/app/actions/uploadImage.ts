"use server"

import { logError } from "@/utils"
import { BACKEND_URL } from "@/utils/constants"
import { cookies } from "next/headers"

export async function uploadImageAction(formData: FormData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value ?? ""
  const refreshToken = cookieStore.get("refreshToken")?.value ?? ""

  const headers = new Headers()
  headers.set("Cookie", `accessToken=${accessToken}; refreshToken=${refreshToken}`)
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  }

  const res = await fetch(`${BACKEND_URL}/v1/profile/upload`, {
    method: "POST",
    headers,
    body: formData,
    cache: "no-store",
  })

  if (!res.ok) {
    let details: unknown
    try {
      details = await res.clone().json()
    } catch {
      details = await res.clone().text()
    }

    logError("uploadImageAction", {
      status: res.status,
      statusText: res.statusText,
      details,
    })

    if (res.status === 401) {
      throw new Error("Are you logged in?")
    }

    throw new Error("Upload failed")
  }

  const data = (await res.json()) as { url: string }
  return data.url
}
