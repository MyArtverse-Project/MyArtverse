import ArtworkGrid from "@/components/ArtworkGrid"
import type { Artwork } from "@/types/characters"
import { LuCat, LuClock, LuTrendingUp } from "react-icons/lu"
import FeaturedArtworkPanel from "./FeaturedArtworkPanel"
import { PanelCard, PanelEmptyState } from "./PanelCard"

export function RecentArtworksPanel({
  artworks,
  isOwner,
  limit = 6,
}: {
  artworks: Artwork[]
  isOwner?: boolean
  limit?: number
}) {
  const recent = [...artworks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit)

  return (
    <PanelCard title="Recent artworks" icon={<LuClock />}>
      {recent.length > 0 ? (
        <ArtworkGrid artworks={recent} className="gap-3" />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Upload artworks to show recent pieces here."
        />
      )}
    </PanelCard>
  )
}

export function MultipleArtworksPanel({
  artworks,
  isOwner,
  title = "Artworks",
}: {
  artworks: Artwork[]
  isOwner?: boolean
  title?: string
}) {
  return (
    <PanelCard title={title} icon={<LuCat />}>
      {artworks.length > 0 ? (
        <ArtworkGrid artworks={artworks} className="gap-3" />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Edit this panel to select artworks."
        />
      )}
    </PanelCard>
  )
}

export function PopularArtworkPanel({
  artwork,
  isOwner,
}: {
  artwork: Artwork | null
  isOwner?: boolean
}) {
  return (
    <FeaturedArtworkPanel
      artwork={artwork}
      title="Popular artwork"
      isOwner={isOwner}
    />
  )
}

export function PopularArtworkGridPanel({
  artworks,
  isOwner,
}: {
  artworks: Artwork[]
  isOwner?: boolean
}) {
  const sorted = [...artworks].sort(
    (a, b) => (b.favoritedBy?.length ?? 0) - (a.favoritedBy?.length ?? 0)
  )

  return (
    <PanelCard title="Popular artwork" icon={<LuTrendingUp />}>
      {sorted.length > 0 ? (
        <ArtworkGrid artworks={sorted.slice(0, 6)} className="gap-3" />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Artworks with favorites will appear here."
        />
      )}
    </PanelCard>
  )
}
