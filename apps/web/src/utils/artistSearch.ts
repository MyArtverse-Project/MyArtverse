import type { ArtistSearchOption } from "@/components/layouts/Forms/ArtistSearchInput"

async function fetchArtistSearch<T extends { users?: ArtistSearchOption[]; actors?: ArtistSearchOption[] }>(
  path: string
): Promise<ArtistSearchOption[]> {
  const response = await fetch(path, { credentials: "include", cache: "no-store" })
  if (!response.ok) return []

  const data = (await response.json()) as T
  return data.users ?? data.actors ?? []
}

export async function searchMavArtists(query: string) {
  const trimmed = query.trim()
  if (!trimmed) return []

  return fetchArtistSearch(
    `/api/artist-search/mav?q=${encodeURIComponent(trimmed)}`
  )
}

export async function searchBlueskyArtists(query: string) {
  const trimmed = query.trim()
  if (!trimmed) return []

  return fetchArtistSearch(
    `/api/artist-search/bluesky?q=${encodeURIComponent(trimmed)}`
  )
}

export async function searchXArtists(query: string) {
  const trimmed = query.trim().replace(/^@+/, "")
  if (!trimmed) return []

  return fetchArtistSearch(
    `/api/artist-search/x?q=${encodeURIComponent(trimmed)}`
  )
}
