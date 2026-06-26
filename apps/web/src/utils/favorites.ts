import type { Artwork, Character } from "@/types/characters"

export function isFavoritedCharacter(
  favoriteCharacters: Character[] | undefined,
  characterId: string
): boolean {
  return favoriteCharacters?.some((character) => character.id === characterId) ?? false
}

export function isFavoritedArtwork(
  favoriteArtworks: Artwork[] | undefined,
  artworkId: string
): boolean {
  return favoriteArtworks?.some((artwork) => artwork.id === artworkId) ?? false
}
