import type { Artwork, Character } from "@/types/characters"
import Link from "next/link"
import { LuGalleryHorizontal, LuLayers } from "react-icons/lu"
import ArtworkGrid from "@/components/ArtworkGrid"
import { PanelCard, PanelEmptyState } from "./PanelCard"

export function MultipleGalleriesPanel({
  galleries,
  ownerHandle,
  isOwner,
}: {
  galleries: { character: Character; artworks: Artwork[] }[]
  ownerHandle: string
  isOwner?: boolean
}) {
  return (
    <PanelCard title="Galleries" icon={<LuLayers />}>
      {galleries.length > 0 ? (
        <div className="flex flex-col gap-6">
          {galleries.map(({ character, artworks }) => (
            <div key={character.id} className="space-y-3">
              <Link
                href={`/@${ownerHandle}/${character.slug}/gallery`}
                className="text-primary text-sm font-semibold hover:underline"
              >
                {character.name}
              </Link>
              {artworks.length > 0 ? (
                <ArtworkGrid artworks={artworks.slice(0, 4)} className="gap-2" />
              ) : (
                <p className="text-muted-foreground text-xs">No artworks yet.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Edit this panel to choose character galleries."
        />
      )}
    </PanelCard>
  )
}

export function GalleryStripPanel({
  artworks,
  title,
  isOwner,
}: {
  artworks: Artwork[]
  title: string
  isOwner?: boolean
}) {
  return (
    <PanelCard title={title} icon={<LuGalleryHorizontal />}>
      {artworks.length > 0 ? (
        <ArtworkGrid artworks={artworks} className="gap-3" />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Edit this panel to configure the gallery."
        />
      )}
    </PanelCard>
  )
}
