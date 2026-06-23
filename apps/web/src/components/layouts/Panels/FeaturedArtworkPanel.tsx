import type { Artwork } from "@/types/characters"
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
  return (
    <MediaPanel
      title={title}
      imageUrl={artwork?.artworkUrl}
      imageAlt={artwork?.title || "Featured artwork"}
      nsfw={!!artwork?.nsfw}
      artistHandle={artwork?.artist?.handle ?? artwork?.owner?.handle}
      downloadUrl={artwork?.artworkUrl}
      isOwner={isOwner}
      emptyHint="Edit this panel to pick a featured artwork."
    />
  )
}
