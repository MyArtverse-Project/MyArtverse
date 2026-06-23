import type { Artwork } from "@/types/characters"
import { getArtworkFeaturedCharacterName } from "@/utils/artworkMetadata"

export type GallerySort = "newest" | "oldest" | "title"
export type GalleryViewMode = "grid" | "list"

export function sortArtworks(artworks: Artwork[], sort: GallerySort) {
  const list = [...artworks]

  switch (sort) {
    case "oldest":
      return list.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    case "title":
      return list.sort((a, b) =>
        (a.title ?? "Untitled").localeCompare(b.title ?? "Untitled")
      )
    default:
      return list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }
}

export function searchArtworks(artworks: Artwork[], query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return artworks

  return artworks.filter((artwork) => {
    const title = artwork.title?.toLowerCase() ?? ""
    const characterName =
      getArtworkFeaturedCharacterName(artwork)?.toLowerCase() ?? ""
    const tags = artwork.tags?.some((tag) =>
      tag.toLowerCase().includes(normalized)
    )

    return (
      title.includes(normalized) ||
      characterName.includes(normalized) ||
      tags
    )
  })
}

export function filterNsfwArtworks(artworks: Artwork[], hideNsfw: boolean) {
  if (!hideNsfw) return artworks
  return artworks.filter((artwork) => !artwork.nsfw)
}

export function isReferenceArtwork(artwork: Artwork) {
  return (
    artwork.tags?.some((tag) => tag.toLowerCase() === "reference") ?? false
  )
}

export function getArtworkCharacterMeta(
  artwork: Artwork,
  fallback?: { name: string; avatarUrl?: string }
) {
  const character =
    artwork.publishedCharacter ?? artwork.charactersFeatured?.[0] ?? null

  if (character) {
    return {
      name: character.name,
      avatarUrl: character.avatarUrl,
    }
  }

  return fallback ?? null
}

export function resolveArtworkGalleryHref(
  artwork: Artwork,
  profileHandle: string
) {
  const character =
    artwork.publishedCharacter ?? artwork.charactersFeatured?.[0] ?? null

  if (!character?.slug) return null

  const ownerHandle = character.owner?.handle ?? profileHandle
  return `/@${ownerHandle}/${character.slug}/gallery/${artwork.id}`
}
