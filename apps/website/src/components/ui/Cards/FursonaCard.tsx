import Link from "next/link"
import clsx from "clsx"
import type { AdoptionStatus, ColorPalette as Palette } from "@/types"
import ColorPalette from "./ColorPalette"
import BuiImage from "../BuiImage"
import { Heart } from "lucide-react"
import Status from "./Status"

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
  likes,
  status = "owned",
  ...attributes
}: {
  name: string
  img?: string
  species?: string
  isHybrid?: boolean
  status?: AdoptionStatus
  palette?: CharacterCardPalette
  likes?: number
  href?: string
} & Pick<React.HTMLAttributes<HTMLDivElement>, "role">) {
  const DynamicElement = !href ? "div" : Link
  return (
    <DynamicElement
      href={!href ? null : (href as any)}
      aria-label={`Character item: ${name}, ${species}`}
      className={clsx(
        "flex flex-col p-4 rounded-md gap-y-2 hover:bg-mute transition-all",
        href ? "cursor-pointer" : ""
      )}
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
        <Status status={status} />
        <h3 className="not-prose font-inter font-bold text-2xl">{name}</h3>
        <span>{species}</span>
        <span className="flex flex-row text-md font-semibold my-2">
          <Heart className="mr-1" size={18} />
          {likes}
        </span>
      </div>
    </DynamicElement>
  )
}
