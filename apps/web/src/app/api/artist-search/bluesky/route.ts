import { NextResponse } from "next/server"

type BlueskyActor = {
  handle: string
  displayName?: string
  avatar?: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    return NextResponse.json({ actors: [] })
  }

  try {
    const response = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActors?term=${encodeURIComponent(query)}&limit=8`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      return NextResponse.json({ actors: [] })
    }

    const data = (await response.json()) as { actors?: BlueskyActor[] }
    const actors = (data.actors ?? []).map((actor) => ({
      handle: actor.handle,
      displayName: actor.displayName ?? null,
      avatarUrl: actor.avatar ?? null,
    }))

    return NextResponse.json({ actors })
  } catch {
    return NextResponse.json({ actors: [] })
  }
}
