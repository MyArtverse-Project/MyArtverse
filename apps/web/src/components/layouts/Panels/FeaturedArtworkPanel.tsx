import type { Artwork } from "@/types/characters"
import { resolveArtistCredit } from "@mav/shared"
import MediaPanel from "./MediaPanel"

export default function FeaturedArtworkPanel({
  artwork,
  title = "Featured artwork",
  isOwner,
}: {
  artwork: Artwork | null
  title?: string
  isOwner?: boolean
}) {
  const artistCredit = artwork ? resolveArtistCredit(artwork) : null

  return (
    <MediaPanel
      title={title}
      imageUrl={artwork?.artworkUrl}
      imageAlt={artwork?.title || "Featured artwork"}
      nsfw={!!artwork?.nsfw}
      artistCredit={artistCredit}
      downloadUrl={artwork?.artworkUrl}
      isOwner={isOwner}
      emptyHint="Edit this panel to pick a featured artwork."
    />
  )
}
