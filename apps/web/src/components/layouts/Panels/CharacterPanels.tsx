import { CharacterCard } from "@/components/layouts/Cards/CharacterCard"
import type { Character } from "@/types/characters"
import { LuUsers } from "react-icons/lu"
import { PanelCard, PanelEmptyState } from "./PanelCard"

function CharacterGrid({
  characters,
  ownerHandle,
}: {
  characters: Character[]
  ownerHandle: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          img={character.avatarUrl}
          species={character.species}
          isHybrid={character.isHybrid}
          status="owned"
          loading={false}
          character={character}
          href={`/@${ownerHandle}/${character.slug}`}
          likes={character.favoritedBy?.length}
        />
      ))}
    </div>
  )
}

export function FeaturedCharacterPanel({
  character,
  ownerHandle,
  isOwner,
}: {
  character: Character | null
  ownerHandle: string
  isOwner?: boolean
}) {
  return (
    <PanelCard title="Featured character" icon={<LuUsers />}>
      {character ? (
        <CharacterGrid characters={[character]} ownerHandle={ownerHandle} />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Edit this panel to pick a featured character."
        />
      )}
    </PanelCard>
  )
}

export function MultipleCharactersPanel({
  characters,
  ownerHandle,
  isOwner,
  title = "Characters",
}: {
  characters: Character[]
  ownerHandle: string
  isOwner?: boolean
  title?: string
}) {
  return (
    <PanelCard title={title} icon={<LuUsers />}>
      {characters.length > 0 ? (
        <CharacterGrid characters={characters} ownerHandle={ownerHandle} />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Edit this panel to select characters."
        />
      )}
    </PanelCard>
  )
}

export function PopularCharacterPanel({
  character,
  ownerHandle,
  isOwner,
}: {
  character: Character | null
  ownerHandle: string
  isOwner?: boolean
}) {
  return (
    <PanelCard title="Popular character" icon={<LuUsers />}>
      {character ? (
        <CharacterGrid characters={[character]} ownerHandle={ownerHandle} />
      ) : (
        <PanelEmptyState
          isOwner={isOwner}
          ownerHint="Add characters to your profile to show the most popular one."
        />
      )}
    </PanelCard>
  )
}
