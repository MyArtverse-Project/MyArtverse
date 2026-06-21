import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { CharacterMasthead } from "@/components/layouts/Mastheads"
import { fetchCharacter, fetchUserData } from "@/utils/api"

export default async function MainProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ handle: string; name: string }>
}) {
  const { handle, name } = await params

  const self = await fetchUserData().catch(() => null)
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
        ownerAvatarUrl={character.owner.avatarUrl ?? undefined}
        pronouns={
          character.attributes.pronouns
            ? character.attributes.pronouns
            : "Unknown"
        }
      />
      {children}
    </AppLayout>
  )
}
