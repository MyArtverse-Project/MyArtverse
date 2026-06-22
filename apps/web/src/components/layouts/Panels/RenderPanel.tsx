import type { User } from "@/app/context/AuthContext"
import type { Artwork, Character, ReferenceSheet } from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import {
  MultipleArtworksPanel,
  PopularArtworkGridPanel,
  RecentArtworksPanel,
} from "./ArtworkPanels"
import {
  FeaturedCharacterPanel,
  MultipleCharactersPanel,
  PopularCharacterPanel,
} from "./CharacterPanels"
import CommentPanel from "./Comments/CommentPanel"
import FeaturedArtworkPanel from "./FeaturedArtworkPanel"
import FeaturedGalleryPanel from "./FeaturedGalleryPanel"
import { MultipleGalleriesPanel } from "./GalleryPanels"
import InformationPanel from "./InformationPanel"
import {
  CommissionQueuePanel,
  FeaturedListingPanel,
  RecentListingsPanel,
} from "./ListingPanels"
import ReferenceSheetPanel from "./ReferenceSheetPanel"
import {
  getPanelLimit,
  getPanelTitle,
  parseArtworkIds,
  parseCharacterSlugs,
} from "@/utils/panels"

function filterArtworksForPanel(
  panel: DashboardPanel,
  artworks: Artwork[],
  type: "user" | "character"
) {
  let filtered = artworks

  if (type === "user" && panel.settings?.characterSlug) {
    const slug = panel.settings.characterSlug
    filtered = artworks.filter(
      (artwork) =>
        artwork.publishedCharacter?.slug === slug ||
        artwork.charactersFeatured?.some((character) => character.slug === slug)
    )
  }

  const ids = parseArtworkIds(panel.settings)
  if (ids.length > 0) {
    filtered = filtered.filter((artwork) => ids.includes(artwork.id))
  }

  return filtered
}

function resolveCharacters(
  characters: Character[],
  settings?: DashboardPanel["settings"]
) {
  const slugs = parseCharacterSlugs(settings)
  if (slugs.length === 0) return characters

  return characters.filter((character) => slugs.includes(character.slug))
}

function getPopularCharacter(characters: Character[]) {
  return (
    [...characters].sort(
      (a, b) => (b.favoritedBy?.length ?? 0) - (a.favoritedBy?.length ?? 0)
    )[0] ?? null
  )
}

function getPopularArtwork(artworks: Artwork[]) {
  return (
    [...artworks].sort(
      (a, b) => (b.favoritedBy?.length ?? 0) - (a.favoritedBy?.length ?? 0)
    )[0] ?? null
  )
}

export function renderPanel(
  panel: DashboardPanel,
  type: "user" | "character",
  target: UserType | Character,
  self: User | UserType | null,
  artworks: Artwork[] = [],
  refSheets: ReferenceSheet[] = [],
  characters: Character[] = []
) {
  const isOwner =
    type === "user"
      ? self?.id === (target as UserType).id
      : self?.handle === (target as Character).owner?.handle

  const ownerHandle =
    type === "user"
      ? (target as UserType).handle
      : (target as Character).owner.handle

  const panelArtworks = filterArtworksForPanel(panel, artworks, type)
  const limit = getPanelLimit(panel.settings)

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
        <InformationPanel target={target} type={type} isOwner={isOwner} />
      )
    case "commission_queue":
      if (type !== "user") return null
      return (
        <CommissionQueuePanel
          user={target as UserType}
          isOwner={isOwner}
        />
      )
    case "featured_listing":
      return <FeaturedListingPanel isOwner={isOwner} />
    case "recent_listings":
      return <RecentListingsPanel isOwner={isOwner} />
    case "featured_character": {
      const character =
        characters.find(
          (item) => item.slug === panel.settings?.characterSlug
        ) ?? characters[0] ?? null

      return (
        <FeaturedCharacterPanel
          character={character}
          ownerHandle={ownerHandle}
          isOwner={isOwner}
        />
      )
    }
    case "popular_character":
      return (
        <PopularCharacterPanel
          character={getPopularCharacter(characters)}
          ownerHandle={ownerHandle}
          isOwner={isOwner}
        />
      )
    case "multiple_characters":
      return (
        <MultipleCharactersPanel
          characters={resolveCharacters(characters, panel.settings).slice(
            0,
            limit
          )}
          ownerHandle={ownerHandle}
          isOwner={isOwner}
          title={getPanelTitle(panel.settings, "Characters")}
        />
      )
    case "featured_gallery":
      return (
        <FeaturedGalleryPanel
          artworks={panelArtworks}
          isOwner={isOwner}
          title={getPanelTitle(
            panel.settings,
            type === "character"
              ? `${(target as Character).name}'s gallery`
              : "Featured gallery"
          )}
        />
      )
    case "multiple_galleries": {
      const selected = resolveCharacters(characters, panel.settings).slice(
        0,
        limit
      )
      const galleries = selected.map((character) => ({
        character,
        artworks: artworks.filter(
          (artwork) =>
            artwork.publishedCharacter?.slug === character.slug ||
            artwork.charactersFeatured?.some(
              (featured) => featured.slug === character.slug
            )
        ),
      }))

      return (
        <MultipleGalleriesPanel
          galleries={galleries}
          ownerHandle={ownerHandle}
          isOwner={isOwner}
        />
      )
    }
    case "featured_artwork": {
      const artwork =
        panelArtworks.find((item) => item.id === panel.settings?.artworkId) ??
        panelArtworks[0] ??
        null

      return (
        <FeaturedArtworkPanel
          artwork={artwork}
          isOwner={isOwner}
          title={getPanelTitle(panel.settings, "Featured artwork")}
        />
      )
    }
    case "recent_artworks":
      return (
        <RecentArtworksPanel
          artworks={panelArtworks}
          isOwner={isOwner}
          limit={limit}
        />
      )
    case "multiple_artworks":
      return (
        <MultipleArtworksPanel
          artworks={panelArtworks.slice(0, limit)}
          isOwner={isOwner}
          title={getPanelTitle(panel.settings, "Artworks")}
        />
      )
    case "popular_artwork": {
      const artwork =
        panelArtworks.find((item) => item.id === panel.settings?.artworkId) ??
        getPopularArtwork(panelArtworks)

      if (panel.settings?.artworkId || panelArtworks.length <= 1) {
        return (
          <FeaturedArtworkPanel
            artwork={artwork}
            isOwner={isOwner}
            title={getPanelTitle(panel.settings, "Popular artwork")}
          />
        )
      }

      return (
        <PopularArtworkGridPanel artworks={panelArtworks} isOwner={isOwner} />
      )
    }
    case "reference_sheet": {
      const refSheet =
        refSheets.find((sheet) => sheet.id === panel.settings?.refSheetId) ??
        refSheets.find((sheet) => sheet.active) ??
        refSheets[0] ??
        null

      return (
        <ReferenceSheetPanel
          refSheet={refSheet}
          isOwner={isOwner}
          title={getPanelTitle(panel.settings, "Reference sheet")}
        />
      )
    }
    default:
      return (
        <div className="text-muted-foreground text-sm">
          Unknown panel type: {panel.type}
        </div>
      )
  }
}
