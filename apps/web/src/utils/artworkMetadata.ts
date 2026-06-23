import type { Artwork } from "@/types/characters"
import { BRAND, resolveArtistCredit } from "@mav/shared"
import { buildPageMetadata, possessiveName, toAbsoluteUrl, truncateDescription } from "./metadata"

export function getArtworkArtistCredit(artwork: Artwork): string | null {
  return resolveArtistCredit(artwork)?.label ?? null
}

export function getArtworkFeaturedCharacterName(artwork: Artwork): string | null {
  return (
    artwork.publishedCharacter?.name?.trim() ||
    artwork.charactersFeatured?.[0]?.name?.trim() ||
    null
  )
}

export function buildArtworkMetadata({
  artwork,
  handle,
  characterSlug,
}: {
  artwork: Artwork
  handle: string
  characterSlug: string
}) {
  const title = artwork.title?.trim() || "Untitled artwork"
  const artistCredit = getArtworkArtistCredit(artwork)
  const featuredCharacter = getArtworkFeaturedCharacterName(artwork)
  const tagLine =
    artwork.tags?.length > 0
      ? artwork.tags
          .slice(0, 6)
          .map((tag) => `#${tag}`)
          .join(" ")
      : null

  const descriptionParts = [
    artistCredit
      ? `Art by ${artistCredit}`
      : featuredCharacter
        ? `Featuring ${featuredCharacter}`
        : null,
    artwork.nsfw ? "NSFW" : null,
    artwork.description?.trim()
      ? truncateDescription(artwork.description)
      : tagLine,
  ].filter(Boolean)

  const description =
    descriptionParts.join(" · ") || `View ${title} on ${BRAND}.`

  const artistHandle = artwork.artist?.handle
  const resolvedArtist = resolveArtistCredit(artwork)

  return buildPageMetadata({
    title,
    description,
    path: `/@${handle}/${characterSlug}/gallery/${artwork.id}`,
    image: artwork.artworkUrl ?? null,
    imageAlt: artwork.altText ?? title,
    type: "article",
    authors: artistHandle
      ? [
          {
            name: `@${artistHandle}`,
            url: toAbsoluteUrl(`/@${artistHandle}`),
          },
        ]
      : resolvedArtist && !resolvedArtist.isInternal
        ? [{ name: resolvedArtist.label, url: resolvedArtist.href }]
        : undefined,
  })
}

export function buildCharacterGalleryMetadata({
  characterName,
  handle,
  characterSlug,
  previewImage,
}: {
  characterName: string
  handle: string
  characterSlug: string
  previewImage?: string | null
}) {
  return buildPageMetadata({
    title: `${possessiveName(characterName)} Gallery`,
    description: `Browse artwork featuring ${characterName} (@${handle}) on ${BRAND}.`,
    path: `/@${handle}/${characterSlug}/gallery`,
    image: previewImage,
    imageAlt: `${characterName}'s gallery`,
  })
}

export function buildCharacterOverviewMetadata({
  characterName,
  handle,
  characterSlug,
  bio,
  avatarUrl,
}: {
  characterName: string
  handle: string
  characterSlug: string
  bio?: string | null
  avatarUrl?: string | null
}) {
  return buildPageMetadata({
    title: characterName,
    description: bio?.trim()
      ? truncateDescription(bio)
      : `Meet ${characterName}, a character by @${handle} on ${BRAND}.`,
    path: `/@${handle}/${characterSlug}`,
    image: avatarUrl,
    imageAlt: `${characterName}'s avatar`,
  })
}

export function buildUserGalleryMetadata({
  displayName,
  handle,
  avatarUrl,
  previewImage,
}: {
  displayName: string
  handle: string
  avatarUrl?: string | null
  previewImage?: string | null
}) {
  return buildPageMetadata({
    title: `${possessiveName(displayName)} Gallery`,
    description: `Browse artwork uploaded by @${handle} on ${BRAND}.`,
    path: `/@${handle}/gallery`,
    image: previewImage ?? avatarUrl ?? null,
    imageAlt: `${displayName}'s gallery`,
  })
}

export function buildUserCharactersMetadata({
  displayName,
  handle,
  avatarUrl,
}: {
  displayName: string
  handle: string
  avatarUrl?: string | null
}) {
  return buildPageMetadata({
    title: `${possessiveName(displayName)} Characters`,
    description: `Explore characters created by @${handle} on ${BRAND}.`,
    path: `/@${handle}/characters`,
    image: avatarUrl,
    imageAlt: `${displayName}'s profile`,
  })
}

export function buildUserProfileMetadata({
  displayName,
  handle,
  bio,
  avatarUrl,
}: {
  displayName: string
  handle: string
  bio?: string | null
  avatarUrl?: string | null
}) {
  return buildPageMetadata({
    title: displayName,
    description: bio?.trim()
      ? truncateDescription(bio)
      : `View @${handle}'s profile on ${BRAND}.`,
    path: `/@${handle}`,
    image: avatarUrl,
    imageAlt: `${displayName}'s profile`,
  })
}

export function pickGalleryPreviewImage(artworks: Artwork[]) {
  const safeArtwork = artworks.find(
    (artwork) => artwork.artworkUrl && !artwork.nsfw
  )

  return safeArtwork?.artworkUrl ?? artworks.find((artwork) => artwork.artworkUrl)?.artworkUrl ?? null
}
