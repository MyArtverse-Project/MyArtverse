import Image from "next/image"

import type { AdoptionStatus, ColorPalette } from "@/types"

type CharacterCardPalette =
  | [ColorPalette]
  | [ColorPalette, ColorPalette]
  | [ColorPalette, ColorPalette, ColorPalette]

export default function FursonaCard({
  name,
  img = "",
  species,
  isHybrid,
  palette,
  status = "notForAdopt"
}: {
  name: string
  img?: string
  species?: string
  isHybrid?: boolean
  status?: AdoptionStatus
  palette?: CharacterCardPalette
}) {
  return (
    <div tabIndex={-1} aria-label={`${name}, ${species}`} className="">
      <Image
        src={img}
        alt={`Avatar of ${name}`}
        loading="lazy"
        decoding="async"
        height="100"
        width="100"
      />
      <div id="fursona-container" className="">
        <span>{name}</span>
        <span>{species}</span>
        <span>{status}</span>
      </div>
    </div>
  )
}
