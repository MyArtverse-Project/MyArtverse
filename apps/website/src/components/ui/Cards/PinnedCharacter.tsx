import React from "react"
import Image from "next/image"
import ColorPalette from "./ColorPalette"
import { ColorPalette as Colors } from "@/types"
import { Button } from "../Buttons"
import { CatIcon, Palette } from "lucide-react"

export default function PinnedCharacter({
  characterImage,
  characterName,
  characterSpecies,
  characterColors,
  artist,
  refSheetImage
}: {
  characterImage: string
  characterName: string
  characterSpecies: string
  characterColors: Colors[]
  artist: string
  refSheetImage: string
}) {
  return (
    <section className="flex flex-row justify-around">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row">
            <Image
              width={118}
              height={118}
              src={characterImage}
              alt={`${characterName}'s avatar`}
            />
            <div className="flex flex-col m-4">
              <h2 className="text-3xl">{characterName}</h2>
              <span className="text-lg">{characterSpecies}</span>
              <ColorPalette palette={characterColors} />
            </div>
          </div>
          <div className="flex flex-col">
            <Button variant="primary" prefixIcon={<CatIcon />}>
              View character details
            </Button>
            <Button variant="primary" prefixIcon={<Palette />}>
              Export ref sheet
            </Button>
          </div>
        </div>
        <div className="mt-auto">
          <h4 className="not-prose text-sm text-subtext">ARTIST CREDIT</h4>
          <span>{artist}</span>
        </div>
      </div>
      <Image
        width={640}
        height={360}
        src={refSheetImage}
        className="rounded-xl"
        alt={`${characterName}'s ref sheet`}
      />
    </section>
  )
}
