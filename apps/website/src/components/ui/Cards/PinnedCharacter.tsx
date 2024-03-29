import { LuCat as CatIcon, LuPalette as Palette } from "react-icons/lu"
import { ColorPalette as Colors } from "@/types/characters"
import { Button } from "../Buttons"
import MFImage from "../MFImage"
import ColorPalette from "./ColorPalette"

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
    <section className="mb-5 flex flex-row justify-around">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row">
            <MFImage width={118} height={118} src={avatar} alt={`${name}'s avatar`} />
            <div className="m-4 flex flex-col">
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
          <h4 className="not-prose text-subtext text-sm">ARTIST CREDIT</h4>
          <span>{artist}</span>
        </div>
      </div>
      <MFImage
        rounded={12}
        width={640}
        height={360}
        src={refSheetImg}
        alt={`${name}'s ref sheet`}
      />
    </section>
  )
}
