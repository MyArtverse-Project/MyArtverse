import { getServerApiUrl } from "@/utils/apiUrl"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type MavSearchUser = {
  id: string
  handle: string
  displayName?: string | null
  avatarUrl?: string | null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    return NextResponse.json({ users: [] })
  }

  try {
    const apiUrl = getServerApiUrl()
    const cookie = request.headers.get("cookie") ?? ""
    const response = await fetch(
      `${apiUrl}/v1/search?query=${encodeURIComponent(query)}&type=user`,
      {
        headers: {
          cookie,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      return NextResponse.json({ users: [] })
    }

    const data = (await response.json()) as { user?: MavSearchUser[] }
    const users = (data.user ?? []).map((user) => ({
      id: user.id,
      handle: user.handle,
      displayName: user.displayName ?? null,
      avatarUrl: user.avatarUrl ?? null,
    }))

    return NextResponse.json({ users })
  } catch {
    return NextResponse.json({ users: [] })
  }
}
