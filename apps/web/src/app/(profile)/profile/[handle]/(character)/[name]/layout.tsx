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
        characterName={character.name}
        visibility={"private"}
        species={character.species}
        ownerHandle={character.owner.handle}
        // pronouns={character.}
      />
      {props.children}
    </AppLayout>
  )
}
