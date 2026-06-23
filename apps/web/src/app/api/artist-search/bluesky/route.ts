import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const USER_AGENT = "MyArtverse/1.0 (artist-search)"

type BlueskyActor = {
  handle: string
  displayName?: string
  avatar?: string
}

function normalizeActorQuery(query: string) {
  const trimmed = query.trim().replace(/^@+/, "")
  if (!trimmed) return []

  const candidates = new Set<string>([trimmed])
  if (!trimmed.includes(".")) {
    candidates.add(`${trimmed}.bsky.social`)
  }

  return [...candidates]
}

async function fetchBlueskyProfile(actor: string) {
  const response = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(actor)}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
    }
  )

  if (!response.ok) return null

  const profile = (await response.json()) as BlueskyActor
  if (!profile.handle) return null

  return profile
}

function toArtistResult(actor: BlueskyActor) {
  return {
    handle: actor.handle,
    displayName: actor.displayName ?? null,
    avatarUrl: actor.avatar ?? null,
  }
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
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "User-Agent": USER_AGENT,
        },
      }
    )

    const results = new Map<string, ReturnType<typeof toArtistResult>>()

    if (response.ok) {
      const data = (await response.json()) as { actors?: BlueskyActor[] }
      for (const actor of data.actors ?? []) {
        results.set(actor.handle, toArtistResult(actor))
      }
    }

    if (results.size === 0) {
      for (const actor of normalizeActorQuery(query)) {
        const profile = await fetchBlueskyProfile(actor)
        if (profile) {
          results.set(profile.handle, toArtistResult(profile))
        }
      }
    }

    return NextResponse.json({ actors: [...results.values()] })
  } catch {
    return NextResponse.json({ actors: [] })
  }
}
