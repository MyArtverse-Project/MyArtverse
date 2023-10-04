import ColorPalette from "./ColorPalette"
import { ColorPalette as Colors } from "@/types"
import { Button } from "../Buttons"
import { CatIcon, Palette } from "lucide-react"
import BuiImage from "../BuiImage"

export default function PinnedCharacter({
  avatar,
  name,
  species,
  colors,
  artist,
  refSheetImg
}: {
  avatar: string
  name: string
  species: string
  colors: Colors[]
  artist: string
  refSheetImg: string
}) {
  return (
    <section className="flex flex-row justify-around mb-5">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row">
            <BuiImage
              width={118}
              height={118}
              src={avatar}
              alt={`${name}'s avatar`}
            />
            <div className="flex flex-col m-4">
              <h2 className="text-3xl">{name}</h2>
              <span className="text-lg">{species}</span>
              <ColorPalette palette={colors} />
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
      <BuiImage
        width={640}
        height={360}
        src={refSheetImg}
        alt={`${name}'s ref sheet`}
      />
    </section>
  )
}
