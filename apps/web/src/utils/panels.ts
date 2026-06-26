import type { DashboardPanel, PanelSettings, PanelType } from "@/types/users"

export const PANEL_TYPES = {
  comments: "comments",
  information: "information",
  featured_gallery: "featured_gallery",
  featured_artwork: "featured_artwork",
  reference_sheet: "reference_sheet",
  featured_character: "featured_character",
  popular_character: "popular_character",
  multiple_characters: "multiple_characters",
  recent_artworks: "recent_artworks",
  multiple_artworks: "multiple_artworks",
  popular_artwork: "popular_artwork",
  multiple_galleries: "multiple_galleries",
  featured_listing: "featured_listing",
  recent_listings: "recent_listings",
  commission_queue: "commission_queue",
  customHTML: "customHTML",
} as const

export type PanelCategory = {
  id: string
  label: string
  options: PanelType[]
}

export const USER_PANEL_CATEGORIES: PanelCategory[] = [
  {
    id: "profile",
    label: "Profile",
    options: ["comments", "information", "commission_queue"],
  },
  {
    id: "characters",
    label: "Characters",
    options: ["featured_character", "popular_character", "multiple_characters"],
  },
  {
    id: "artworks",
    label: "Artworks",
    options: [
      "featured_artwork",
      "recent_artworks",
      "multiple_artworks",
      "popular_artwork",
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    options: ["featured_gallery", "multiple_galleries"],
  },
  {
    id: "listings",
    label: "Listings",
    options: ["featured_listing", "recent_listings"],
  },
]

export const CHARACTER_PANEL_CATEGORIES: PanelCategory[] = [
  {
    id: "profile",
    label: "Profile",
    options: ["comments", "information", "reference_sheet"],
  },
  {
    id: "artworks",
    label: "Artworks",
    options: [
      "featured_artwork",
      "recent_artworks",
      "multiple_artworks",
      "popular_artwork",
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    options: ["featured_gallery"],
  },
]

export const USER_PANEL_OPTIONS: PanelType[] = USER_PANEL_CATEGORIES.flatMap(
  (category) => category.options
)

export const CHARACTER_PANEL_OPTIONS: PanelType[] =
  CHARACTER_PANEL_CATEGORIES.flatMap((category) => category.options)

export const COMING_SOON_PANEL_TYPES: ReadonlySet<PanelType> = new Set([
  "featured_listing",
  "recent_listings",
  "multiple_galleries",
  "popular_character",
  "popular_artwork",
])

export function isPanelComingSoon(type: PanelType): boolean {
  return COMING_SOON_PANEL_TYPES.has(type)
}

export function getFirstEnabledPanelOption(options: PanelType[]): PanelType {
  return options.find((type) => !isPanelComingSoon(type)) ?? options[0]
}

export function getPanelAt(
  panels: DashboardPanel[],
  position: { row: number; col: number }
) {
  return panels.find(
    (panel) =>
      panel.position.row === position.row && panel.position.col === position.col
  )
}

export function panelNeedsArtworks(type: PanelType) {
  return [
    "featured_gallery",
    "featured_artwork",
    "recent_artworks",
    "multiple_artworks",
    "popular_artwork",
    "multiple_galleries",
  ].includes(type)
}

export function panelNeedsCharacters(type: PanelType) {
  return [
    "featured_character",
    "popular_character",
    "multiple_characters",
    "multiple_galleries",
    "featured_gallery",
  ].includes(type)
}

export function parseArtworkIds(settings?: PanelSettings) {
  if (!settings?.artworkIds?.trim()) return []
  return settings.artworkIds.split(",").map((id) => id.trim()).filter(Boolean)
}

export function parseCharacterSlugs(settings?: PanelSettings) {
  if (!settings?.characterSlugs?.trim()) return []
  return settings.characterSlugs
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
}

export function getPanelLimit(settings?: PanelSettings, fallback = 6) {
  const parsed = Number(settings?.limit)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function getPanelTitle(settings?: PanelSettings, fallback: string) {
  return settings?.customTitle?.trim() || fallback
}
