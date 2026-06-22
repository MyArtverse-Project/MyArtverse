import type { User } from "@/app/context/AuthContext"
import type { Artwork, Character, ReferenceSheet } from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import CommentPanel from "./Comments/CommentPanel"
import FeaturedArtworkPanel from "./FeaturedArtworkPanel"
import FeaturedGalleryPanel from "./FeaturedGalleryPanel"
import InformationPanel from "./InformationPanel"
import ReferenceSheetPanel from "./ReferenceSheetPanel"
import { parseArtworkIds } from "@/utils/panels"

export function renderPanel(
  panel: DashboardPanel,
  type: "user" | "character",
  target: UserType | Character,
  self: User | UserType | null,
  artworks: Artwork[] = [],
  refSheets: ReferenceSheet[] = []
) {
  const isOwner =
    type === "user"
      ? self?.id === (target as UserType).id
      : self?.handle === (target as Character).owner?.handle

  switch (panel.type) {
    case "customHTML":
      return null
    case "comments":
      return (
        <CommentPanel
          comments={target.comments ?? []}
          self={self as UserType | null}
          type={type}
          characterName={
            type === "character" ? (target as Character).slug : undefined
          }
        />
      )
    case "information":
      return (
        <InformationPanel
          target={target}
          type={type}
          isOwner={isOwner}
        />
      )
    case "featured_gallery": {
      const ids = parseArtworkIds(panel.settings)
      let filtered = artworks

      if (type === "user" && panel.settings?.characterSlug) {
        const slug = panel.settings.characterSlug
        filtered = artworks.filter(
          (artwork) =>
            artwork.publishedCharacter?.slug === slug ||
            artwork.charactersFeatured?.some((character) => character.slug === slug)
        )
      }

      if (ids.length > 0) {
        filtered = filtered.filter((artwork) => ids.includes(artwork.id))
      }

      return (
        <FeaturedGalleryPanel
          artworks={filtered}
          isOwner={isOwner}
          title={
            type === "character"
              ? `${(target as Character).name}'s gallery`
              : "Featured gallery"
          }
        />
      )
    }
    case "featured_artwork": {
      const artwork =
        artworks.find((item) => item.id === panel.settings?.artworkId) ?? null

      return <FeaturedArtworkPanel artwork={artwork} isOwner={isOwner} />
    }
    case "reference_sheet": {
      const refSheet =
        refSheets.find((sheet) => sheet.id === panel.settings?.refSheetId) ??
        refSheets.find((sheet) => sheet.active) ??
        refSheets[0] ??
        null

      return <ReferenceSheetPanel refSheet={refSheet} isOwner={isOwner} />
    }
    default:
      return (
        <div className="text-muted-foreground text-sm">
          Unknown panel type: {panel.type}
        </div>
      )
  }
}
