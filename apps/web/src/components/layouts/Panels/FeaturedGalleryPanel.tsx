import ArtworkGrid from "@/components/ArtworkGrid"
import type { Artwork } from "@/types/characters"
import { Group } from "@/components/ui/group"

export default function FeaturedGalleryPanel({
  artworks,
  title = "Featured gallery",
  isOwner,
}: {
  artworks: Artwork[]
  title?: string
  isOwner?: boolean
}) {
  return (
    <Group title={title} containerStyle="border-padding">
      {artworks.length > 0 ? (
        <ArtworkGrid artworks={artworks} />
      ) : (
        <p className="text-muted-foreground text-sm">
          {isOwner
            ? "No artworks selected. Edit this panel to choose a data source."
            : "No artworks to display yet."}
        </p>
      )}
    </Group>
  )
}
