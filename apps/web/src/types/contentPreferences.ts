export type ContentPreferences = {
  showNsfw: boolean
  nsfwDisplayMode: "blur" | "show"
}

export const DEFAULT_CONTENT_PREFERENCES: ContentPreferences = {
  showNsfw: false,
  nsfwDisplayMode: "blur",
}

export const CONTENT_PREFERENCES_STORAGE_KEY = "mav-content-preferences"

export function parseContentPreferences(
  value: unknown
): ContentPreferences {
  if (!value || typeof value !== "object") {
    return { ...DEFAULT_CONTENT_PREFERENCES }
  }
  const v = value as Partial<ContentPreferences>
  return {
    showNsfw: !!v.showNsfw,
    nsfwDisplayMode: v.nsfwDisplayMode === "show" ? "show" : "blur",
  }
}
