import type { DashboardPanel, PanelSettings, PanelType } from "@/types/users"

export const PANEL_TYPES = {
  comments: "comments",
  information: "information",
  featured_gallery: "featured_gallery",
  featured_artwork: "featured_artwork",
  reference_sheet: "reference_sheet",
  customHTML: "customHTML",
} as const

export const USER_PANEL_OPTIONS: PanelType[] = [
  "comments",
  "information",
  "featured_gallery",
  "featured_artwork",
]

export const CHARACTER_PANEL_OPTIONS: PanelType[] = [
  "comments",
  "information",
  "featured_gallery",
  "featured_artwork",
  "reference_sheet",
]

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
  return type === "featured_gallery" || type === "featured_artwork"
}

export function parseArtworkIds(settings?: PanelSettings) {
  if (!settings?.artworkIds?.trim()) return []
  return settings.artworkIds.split(",").map((id) => id.trim()).filter(Boolean)
}
