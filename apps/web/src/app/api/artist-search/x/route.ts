import { NextResponse } from "next/server"

function normalizeHandle(value: string) {
  return value.trim().replace(/^@+/, "")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = normalizeHandle(searchParams.get("q") ?? "")

  if (!query || !/^[A-Za-z0-9_]{1,15}$/.test(query)) {
    return NextResponse.json({ users: [] })
  }

  try {
    const response = await fetch(`https://api.fxtwitter.com/${encodeURIComponent(query)}`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return NextResponse.json({ users: [] })
    }

    const data = (await response.json()) as {
      user?: {
        screen_name?: string
        name?: string
        avatar_url?: string
      }
    }

    const user = data.user
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
