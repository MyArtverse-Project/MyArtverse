import GalleryView from "./GalleryView"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import {
  buildCharacterGalleryMetadata,
  pickGalleryPreviewImage,
} from "@/utils/artworkMetadata"
import {
  fetchCharacter,
  fetchCharacterGalleryFolders,
  fetchUserData,
  getArtworks,
} from "@/utils/api"
import { loadCharacter } from "@/utils/loadCharacter"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; name: string }>
}): Promise<Metadata> {
  const { handle, name } = await params

  try {
    const [character, artworks] = await Promise.all([
      fetchCharacter(handle, name),
      getArtworks(handle, name).catch(() => []),
    ])

    return buildCharacterGalleryMetadata({
      characterName: character.name,
      handle,
      characterSlug: name,
      previewImage:
        pickGalleryPreviewImage(artworks) ?? character.avatarUrl ?? null,
    })
  } catch {
    return buildPageMetadata({
      title: "Gallery",
      description: `View a character gallery on ${BRAND}.`,
      path: `/@${handle}/${name}/gallery`,
    })
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string; name: string }>
}) {
  const { handle, name } = await params

  const [character, artworks, self] = await Promise.all([
    loadCharacter(handle, name),
    getArtworks(handle, name).catch(() => []),
    fetchUserData().catch(() => null),
  ])

  const folders = await fetchCharacterGalleryFolders(character.id).catch(
    () => []
  )
  const isOwner = self?.handle === character.owner?.handle

  return (
    <MarginClamp>
      <GalleryView
        characterId={character.id}
        ownerHandle={handle}
        characterSlug={name}
        characterName={character.name}
        characterAvatarUrl={character.avatarUrl}
        artworks={artworks}
        folders={folders}
        owner={isOwner}
      />
    </MarginClamp>
  )
}
