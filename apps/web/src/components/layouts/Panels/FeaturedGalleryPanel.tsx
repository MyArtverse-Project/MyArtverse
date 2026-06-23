import ArtworkGrid from "@/components/ArtworkGrid"
import type { Artwork } from "@/types/characters"
import { LuGalleryHorizontal } from "react-icons/lu"
import { PanelCard, PanelEmptyState } from "./PanelCard"

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
    <PanelCard title={title} icon={<LuGalleryHorizontal />}>
      {artworks.length > 0 ? (
        <ArtworkGrid artworks={artworks} className="gap-3" />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Edit this panel to choose a gallery source."
        />
      )}
    </PanelCard>
  )
}
