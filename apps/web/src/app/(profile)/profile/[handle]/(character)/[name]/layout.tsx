import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { CharacterMasthead } from "@/components/layouts/Mastheads"
import type { DefineRouteParams } from "@/types"
import { fetchCharacter, fetchUserData } from "@/utils/api"

type AsyncProps = DefineRouteParams<{ handle: string; name: string }>

export default async function MainProfileLayout(
  props: React.PropsWithChildren & AsyncProps
) {
  const { handle, name } = await props.params

  const self = await fetchUserData()
  const character = await fetchCharacter(handle, name)

  return (
    <AppLayout>
      <CharacterMasthead
        avatarUrl={character.avatarUrl}
        characterId={character.id}
        isOwner={self?.handle === character.owner.handle}
        characterName={character.name}
        characterSlug={character.slug}
        visibility={character.visibility}
        species={character.species}
        ownerHandle={character.owner.handle}
        pronouns={character.attributes.pronouns ? character.attributes.pronouns : "Unknown"}
      />
      {props.children}
    </AppLayout>
  )
}
