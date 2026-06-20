import GalleryView from "./GalleryView"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import {
  fetchCharacter,
  fetchCharacterGalleryFolders,
  fetchUserData,
  getArtworks,
} from "@/utils/api"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s gallery`,
    description: `See ${userPlaceholder}'s gallery on ${BRAND} by creating an account!`,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string; name: string }>
}) {
  const { handle, name } = await params
  const [character, artworks, self] = await Promise.all([
    fetchCharacter(handle, name),
    getArtworks(handle, name),
    fetchUserData().catch(() => null),
  ])

  const folders = await fetchCharacterGalleryFolders(character.id).catch(() => [])
  const isOwner = self?.handle === character.owner.handle

  return (
    <MarginClamp>
      <GalleryView
        characterId={character.id}
        artworks={artworks}
        folders={folders}
        owner={isOwner}
      />
    </MarginClamp>
  )
}
