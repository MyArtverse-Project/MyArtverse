import ArtistCard from "@/components/layouts/Browse/ArtistCard"
import ShelfSection from "@/components/layouts/Browse/Shelf"
import { CharacterCard } from "@/components/layouts/Cards"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { getArtistOpenComissions, getFeatured, getNewCharacters } from "@/utils/api"
import {
  LuBrush as Brush,
  LuHeart as Heart,
  LuLayers as Layers,
  LuSparkles as Sparkles
} from "react-icons/lu"

export default async function Browse() {
  const featuredCharacters = await getFeatured()
  const newCharacters = await getNewCharacters()
  const artists = await getArtistOpenComissions()
  return (
    <MarginClamp>
      <div className="mx-auto my-20 flex  flex-col justify-between gap-y-2 md:mt-8 md:flex-col">
        <ShelfSection icon={<Heart size={20} />} title={"Featured Characters"}>
          {featuredCharacters.map((character, index) => (
            <CharacterCard
              character={character}
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              href={`/@${character.owner.handle}/${character.slug}`}
              likes={character.favoritedBy.length}
              key={index}
            />
          ))}
        </ShelfSection>
        <ShelfSection icon={<Sparkles size={20} />} title={"Recently created characters"}>
          {newCharacters.map((character, index) => (
            <CharacterCard
              character={character}
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              href={`/@${character.owner.handle}/${character.slug}`}
              likes={character.favoritedBy.length}
              key={index}
            />
          ))}
        </ShelfSection>
        {/* TODO create profile card and collections card */}
        <ShelfSection icon={<Brush size={20} />} title={"Artists Open for Comissions"}>
          {artists.map((artist, index) => (
            <ArtistCard
              artistAvatarURL={artist.avatarUrl}
              artistDisplayName={artist.displayName ? artist.displayName : artist.handle}
              artistHandle={artist.handle}
              followers={artist.followers.length}
              badges={artist.badges.length}
              key={index}
            />
          ))}
        </ShelfSection>
      </div>
    </MarginClamp>
  )
}
