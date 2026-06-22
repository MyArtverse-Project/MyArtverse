import type { Artwork } from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import { getArtworks } from "./api"

export async function loadOverviewArtworks(
  handle: string,
  options: {
    characterSlug?: string
    user?: UserType
    panels?: DashboardPanel[]
  } = {}
): Promise<Artwork[]> {
  if (options.characterSlug) {
    try {
      return await getArtworks(handle, options.characterSlug)
    } catch {
      return []
    }
  }

  const slugs = new Set<string>()

  for (const character of options.user?.characters ?? []) {
    slugs.add(character.slug)
  }

  for (const panel of options.panels ?? []) {
    if (panel.settings?.characterSlug) {
      slugs.add(panel.settings.characterSlug)
    }
  }

  if (slugs.size === 0) {
    return []
  }

  const results = await Promise.all(
    [...slugs].map((slug) => getArtworks(handle, slug).catch(() => [] as Artwork[]))
  )

  return results.flat()
}
