export type ExternalArtistResult = {
  handle: string
  displayName?: string | null
  avatarUrl?: string | null
}

export async function searchBlueskyArtists(
  query: string
): Promise<ExternalArtistResult[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const response = await fetch(
    `/api/artist-search/bluesky?q=${encodeURIComponent(trimmed)}`
  )

  if (!response.ok) return []

  const data = (await response.json()) as { actors?: ExternalArtistResult[] }
  return data.actors ?? []
}

export async function searchXArtists(
  query: string
): Promise<ExternalArtistResult[]> {
  const trimmed = query.trim().replace(/^@+/, "")
  if (!trimmed) return []

  const response = await fetch(
    `/api/artist-search/x?q=${encodeURIComponent(trimmed)}`
  )

  if (!response.ok) return []

  const data = (await response.json()) as { users?: ExternalArtistResult[] }
  return data.users ?? []
}
