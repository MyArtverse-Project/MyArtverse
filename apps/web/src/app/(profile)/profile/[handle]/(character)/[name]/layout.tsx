import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { CharacterMasthead } from "@/components/layouts/Mastheads"
import { fetchUserDataOptional } from "@/utils/api"
import { isFavoritedCharacter } from "@/utils/favorites"
import { loadCharacter } from "@/utils/loadCharacter"

export default async function MainProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ handle: string; name: string }>
}) {
  const { handle, name } = await params

  const [self, character] = await Promise.all([
    fetchUserDataOptional(),
    loadCharacter(handle, name),
  ])

  const isOwner = self?.handle === character.owner?.handle

  return (
    <AppLayout>
      <CharacterMasthead
        avatarUrl={character.avatarUrl}
        characterId={character.id}
        isOwner={isOwner}
        showFavorite={!!self && !isOwner}
        isFavorited={
          self ? isFavoritedCharacter(self.favoriteCharacters, character.id) : false
        }
        characterName={character.name}
        characterSlug={character.slug}
        visibility={character.visibility}
        species={character.species}
        ownerHandle={character.owner?.handle ?? handle}
        ownerAvatarUrl={character.owner?.avatarUrl ?? undefined}
        pronouns={character.attributes?.pronouns ?? "Unknown"}
      />
      {children}
    </AppLayout>
  )
}
