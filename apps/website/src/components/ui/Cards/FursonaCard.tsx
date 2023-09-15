import Image from "next/image"

import type { AdoptionStatus, ColorPalette as Palette } from "@/types"
import ColorPalette from "./ColorPalette"
import BuiImage from "../BuiImage"
import { useRouter } from "next/navigation"
import Link from "next/link"

type CharacterCardPalette =
  | [Palette]
  | [Palette, Palette]
  | [Palette, Palette, Palette]

export default function FursonaCard({
  name,
  img = "",
  species,
  isHybrid,
  palette,
  href,
  status = "notForAdopt",
  ...attributes
}: {
  name: string
  img?: string
  species?: string
  isHybrid?: boolean
  status?: AdoptionStatus
  palette?: CharacterCardPalette
  href?: string,
} & Pick<React.HTMLAttributes<HTMLDivElement>, "role">) {
  const DynamicElement = !href ? "div" : Link
  return (
    <DynamicElement
      // TODO: I'll change it dw bb 
      href={href as any}
      tabIndex={0}
      aria-label={`Character item: ${name}, ${species}`}
      className="p-5 border border-400 bg-200 rounded-md grid gap-y-2"
      {...attributes}
    >
      <div className="overflow-hidden rounded-md">
        <BuiImage
          src={img}
          objectFit="cover"
          aspectRatio="1/1"
          width="100%"
          alt={`Avatar of ${name}`}
          sizes="(max-width: 1280px) 400px"
          strategy="neutral"
        />
        <ColorPalette
          width="100%"
          palette={[
            { color: "red", name: "" },
            { color: "blue", name: "" },
            { color: "green", name: "" }
          ]}
        />
      </div>
      <div className="grid">
        <h3 className="not-prose font-inter font-bold text-2xl">{name}</h3>
        <span>{species}</span>
      </div>
    </DynamicElement>
  )
}
