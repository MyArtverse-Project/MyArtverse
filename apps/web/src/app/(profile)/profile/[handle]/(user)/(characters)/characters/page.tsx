import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import type { DefineRouteParams } from "@/types"
import { buildUserCharactersMetadata } from "@/utils/artworkMetadata"
import { fetchUser, fetchUserCharacters, fetchUserDataOptional } from "@/utils/api"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import CharacterView from "./CharacterView"

type AsyncProps = DefineRouteParams<{ handle: string }>

export async function generateMetadata({
  params,
}: AsyncProps): Promise<Metadata> {
  const { handle } = await params

  try {
    const user = await fetchUser(handle)

    return buildUserCharactersMetadata({
      displayName: user.displayName ?? handle,
      handle,
      avatarUrl: user.avatarUrl ?? null,
    })
  } catch {
    return buildPageMetadata({
      title: "Characters",
      description: `Browse characters on ${BRAND}.`,
      path: `/@${handle}/characters`,
    })
  }
}

export default async function Page({ params }: AsyncProps) {
  const { handle } = await params
  const characters = await fetchUserCharacters(handle)
  const { folders, id } = await fetchUser(handle)
  const self = await fetchUserDataOptional()
  const isCharacterFolder = (folder: { contentType?: string }) =>
    !folder.contentType || folder.contentType === "characters"
  const characterFolders = folders
    .filter(isCharacterFolder)
    .map((folder) => ({
      ...folder,
      children: folder.children?.filter(isCharacterFolder),
    }))

  return (
    <MarginClamp>
      <CharacterView
        handle={handle}
        characters={characters}
        folders={characterFolders}
        owner={self ? self.id === id : false}
      />
    </MarginClamp>
  )
}
