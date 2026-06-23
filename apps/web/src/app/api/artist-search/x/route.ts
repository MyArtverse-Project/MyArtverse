import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const USER_AGENT = "MyArtverse/1.0 (artist-search)"

function normalizeHandle(value: string) {
  return value.trim().replace(/^@+/, "")
}

type FxTwitterUser = {
  screen_name?: string
  name?: string
  avatar_url?: string
}

async function fetchFxTwitterUser(handle: string) {
  const response = await fetch(
    `https://api.fxtwitter.com/${encodeURIComponent(handle)}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
    }
  )

  if (!response.ok) return null

  const data = (await response.json()) as { user?: FxTwitterUser }
  return data.user ?? null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = normalizeHandle(searchParams.get("q") ?? "")

  if (!query || !/^[A-Za-z0-9_]{1,15}$/.test(query)) {
    return NextResponse.json({ users: [] })
  }

  try {
    const user = await fetchFxTwitterUser(query)

    if (!user?.screen_name) {
      return NextResponse.json({ users: [] })
    }

    return NextResponse.json({
      users: [
        {
          handle: user.screen_name,
          displayName: user.name ?? null,
          avatarUrl: user.avatar_url?.replace("_normal.", "_400x400.") ?? null,
        },
      ],
    })
  } catch {
    return NextResponse.json({ users: [] })
  }
}
