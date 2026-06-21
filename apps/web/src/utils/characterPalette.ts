import type { Character } from "@/types/characters"

function normalizeColor(color: string) {
  const trimmed = color.trim()
  if (!trimmed) return null
  if (trimmed.startsWith("#")) return trimmed
  if (/^[0-9A-Fa-f]{3}$/.test(trimmed) || /^[0-9A-Fa-f]{6}$/.test(trimmed)) {
    return `#${trimmed}`
  }
  return null
}

export function getCharacterPalette(
  character: Pick<Character, "refSheets"> | null | undefined
) {
  const sheets = character?.refSheets ?? []

  for (const sheet of sheets) {
    const variants = sheet.variants ?? []
    const mainVariant = variants.find((variant) => variant.main) ?? variants[0]
    const colors = mainVariant?.colors ?? []

    const normalized = colors
      .map((color) => normalizeColor(color))
      .filter((color): color is string => !!color)

    if (normalized.length > 0) return normalized
  }

  return []
}
