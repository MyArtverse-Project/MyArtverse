import Link from "next/link"
import type { AdoptionStatus, ColorPalette as Palette } from "@/types"
import clsx from "clsx"
import { LuHeart as Heart } from "react-icons/lu"
import MFImage from "../MFImage"
import ColorPalette from "./ColorPalette"
import Status from "./Status"

type CharacterCardPalette = [Palette] | [Palette, Palette] | [Palette, Palette, Palette]

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
        "hover:bg-mute flex flex-col gap-y-2 rounded-md p-4 transition-all",
        href ? "cursor-pointer" : ""
      )}
      {...attributes}
    >
      <div className="overflow-hidden rounded-md">
        <MFImage
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
        <h3 className="not-prose font-inter text-2xl font-bold">{name}</h3>
        <span>{species}</span>
        <span className="text-md my-2 flex flex-row font-semibold">
          <Heart className="mr-1" size={18} />
          {likes}
        </span>
      </div>
    </DynamicElement>
  )
}
