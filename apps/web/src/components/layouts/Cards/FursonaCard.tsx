import { Url } from "url"
import type { FursonaStatus as AdoptionStatus } from "@/types/characters"
import type { MapElement } from "@/types/utils"
import { cn } from "@mav/shared/utils"
import Image from "next/image"
import Link from "next/link"
import { LuHeart as Heart } from "react-icons/lu"
import ColorPalette from "./ColorPalette"
import Status from "./Status"

export default function FursonaCard({
  name,
  img = "/UserProfile.png",
  species,
  loading,
  isHybrid,
  palette,
  href,
  likes,
  status = "owned",
  ...attributes
}: {
  name?: string
  img?: string
  species?: string
  isHybrid?: boolean
  status?: AdoptionStatus
  loading?: boolean
  palette?: string[]
  likes?: number
  href?: string
} & Pick<React.HTMLAttributes<MapElement<"div">>, "role">) {
  const DynamicElement = !href ? "div" : Link

  return (
    <DynamicElement
      href={!href ? null : (href as Url)}
      aria-label={`Character item: ${name}, ${species}`}
      className={cn(
        "hover:bg-mute flex flex-col gap-y-2 rounded-md p-4 transition-all",
        href ? "cursor-pointer" : ""
      )}
      {...attributes}
    >
      <div className="relative h-0 w-full overflow-hidden rounded-md pb-[100%]">
        {loading && <div className="bg-400 h-full w-full animate-pulse" />}
        <Image
          src={img}
          alt={`Avatar of ${name}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          width={640}
          height={640}
        />
      </div>

      <ColorPalette
        palette={
          loading
            ? [
                "#FF0000",
                "#FFA500",
                "#FFFF00",
                "#008000",
                "#0000FF",
                "#4B0082",
                "#EE82EE"
              ]
            : []
        }
        height={"50px"}
      />
      {loading ? (
        <>
          <div className="bg-400 h-8 w-full animate-pulse rounded-md" />
          <div className="bg-400 h-6 w-full animate-pulse rounded-md" />
          <div className="bg-400 h-4 w-full animate-pulse rounded-md" />
        </>
      ) : (
        <>
          <Status status={status} />
          <h3 className="not-prose font-inter text-2xl font-bold">{name}</h3>
          {/* <span>{displaySpecies(species)}</span> */}
          <span className="text-md my-2 flex flex-row font-semibold">
            <Heart className="mr-1" size={18} />
            {likes}
          </span>
        </>
      )}
    </DynamicElement>
  )
}
