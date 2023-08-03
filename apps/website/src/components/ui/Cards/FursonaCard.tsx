import Image from "next/image"

import type { AdoptionStatus, ColorPalette } from "@/types"

type Palette =
  | [ColorPalette]
  | [ColorPalette, ColorPalette]
  | [ColorPalette, ColorPalette, ColorPalette]

interface FursonaCardProps {
  name?: string
  img?: string
  species?: string
  isHybrid?: boolean
  status?: AdoptionStatus
  palette?: Palette
}

export default function FursonaCard(props: FursonaCardProps) {
  const { name, img = "", species, isHybrid, palette } = props

  return (
    <div tabIndex={-1} aria-label={`${name}, ${species}`} className="">
      <Image
        src={img}
        alt={`Avatar of ${name}`}
        loading="lazy"
        decoding="async"
      />
      <div id="fursona-container" className=""></div>
    </div>
  )
}
