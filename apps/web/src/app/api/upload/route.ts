import { logError } from "@/utils"
import { getServerApiUrl } from "@/utils/apiUrl"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const apiUrl = getServerApiUrl()
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value ?? ""
    const refreshToken = cookieStore.get("refreshToken")?.value ?? ""

    if (!accessToken) {
      return NextResponse.json({ error: "Are you logged in?" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const upstream = new FormData()
    upstream.append(
      "file",
      file,
      file instanceof File ? file.name : "upload.png"
    )

    const headers = new Headers()
    headers.set("Cookie", `accessToken=${accessToken}; refreshToken=${refreshToken}`)
    headers.set("Authorization", `Bearer ${accessToken}`)

    const res = await fetch(`${apiUrl}/v1/profile/upload`, {
      method: "POST",
      headers,
      body: upstream,
      cache: "no-store",
    })

    if (!res.ok) {
      let details: unknown
      try {
        details = await res.clone().json()
      } catch {
        details = await res.clone().text()
      }

      logError("POST /api/upload", {
        status: res.status,
        statusText: res.statusText,
        details,
      })

      const message =
        res.status === 401
          ? "Are you logged in?"
          : typeof details === "object" &&
              details !== null &&
              "error" in details &&
              typeof (details as { error: unknown }).error === "string"
            ? (details as { error: string }).error
            : "Upload failed"

      return NextResponse.json({ error: message }, { status: res.status })
    }

    const data = (await res.json()) as { url: string }
    return NextResponse.json({ url: data.url })
  } catch (error) {
    logError("POST /api/upload (unexpected)", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
