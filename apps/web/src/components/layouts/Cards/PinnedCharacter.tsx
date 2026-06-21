import { displaySpecies } from "@/utils/displayer"
import { Button } from "@/components/ui/button"
import NsfwMedia from "@/components/NsfwMedia"
import Image from "next/image"
import { LuCat as CatIcon, LuPin, LuPalette as Palette } from "react-icons/lu"
import ColorPalette from "./ColorPalette"

interface PinnedCharacterProps {
  avatar: string
  name: string
  species: string
  colors: string[]
  artist: string
  refSheetImg: string
  refSheetNsfw?: boolean
}

export function PinnedCharacter({
  avatar,
  name,
  species,
  colors,
  artist,
  refSheetImg,
  refSheetNsfw = false,
}: PinnedCharacterProps) {
  return (
    <section className="border-border mb-5 flex flex-row justify-between rounded-lg border p-4">
      <div className="flex w-full flex-col">
        <span className="mb-2 flex flex-row items-center">
          <LuPin className={"mr-2"} size={18} />
          Pinned Character
        </span>
        <div className="flex flex-col justify-between">
          <div className="flex w-full flex-row">
            <Image
              width={250}
              height={250}
              src={avatar}
              alt={`${name}'s avatar`}
            />
            <div className="m-4 flex w-full flex-col">
              <h2 className="text-3xl">{name}</h2>
              <span className="text-lg">{displaySpecies(species)}</span>
              <ColorPalette palette={colors} />
            </div>
          </div>
          <div className="mt-4 flex flex-row space-x-3">
            <Button>
              <CatIcon size={19} />
              View character details
            </Button>
            <Button>
              <Palette size={19} />
              Export ref sheet
            </Button>
          </div>
        </div>
        <div className="mt-auto">
          <h4 className="not-prose text-muted-foreground text-sm">
            ARTIST CREDIT
          </h4>
          <span>{artist}</span>
        </div>
      </div>
      <div className="relative h-64 w-full max-w-xl overflow-hidden">
        <NsfwMedia
          src={refSheetImg}
          alt={`${name}'s ref sheet`}
          nsfw={refSheetNsfw}
          fill
          className="object-contain object-center"
        />
      </div>
    </section>
  )
}
