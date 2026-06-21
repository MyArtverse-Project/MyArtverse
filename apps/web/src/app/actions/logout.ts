"use server"

import { logError } from "@/utils"
import { getServerApiUrl } from "@/utils/apiUrl"
import { cookies } from "next/headers"

export async function logoutAction() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value ?? ""
  const refreshToken = cookieStore.get("refreshToken")?.value ?? ""

  try {
    await fetch(`${getServerApiUrl()}/v1/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken};refreshToken=${refreshToken}`,
      },
      credentials: "include",
    })
  } catch (error) {
    logError("logoutAction", error)
  }

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")

  return { success: true as const }
}
