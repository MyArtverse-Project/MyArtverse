import NsfwMedia from "@/components/NsfwMedia"
import type { Artwork } from "@/types/characters"
import { Group } from "@/components/ui/group"

export default function FeaturedArtworkPanel({
  artwork,
  isOwner,
}: {
  artwork: Artwork | null
  isOwner?: boolean
}) {
  return (
    <Group title="Featured artwork" containerStyle="border-padding">
      {artwork?.artworkUrl ? (
        <div className="space-y-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <NsfwMedia
              src={artwork.artworkUrl}
              alt={artwork.title || "Featured artwork"}
              nsfw={!!artwork.nsfw}
              fill
              className="object-cover"
            />
          </div>
          {artwork.title ? (
            <p className="text-sm font-medium">{artwork.title}</p>
          ) : null}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          {isOwner
            ? "No artwork selected. Edit this panel to pick one."
            : "No featured artwork yet."}
        </p>
      )}
    </Group>
  )
}
