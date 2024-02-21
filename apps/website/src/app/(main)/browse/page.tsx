import { MarginClamp } from "@/components/ui"
import { FursonaCard } from "@/components/ui/Cards"
import {
  LuBrush as Brush,
  LuHeart as Heart,
  LuLayers as Layers,
  LuSparkles as Sparkles
} from "react-icons/lu"
import { FursonaStatus } from "@/types/characters"
import ShelfSection from "./ShelfSection"

export default function Browse() {
  const RandomizedFursonaCards = () => {
    return [...Array(7)].map((_, i) => (
      <FursonaCard
        key={i}
        name={"Renzo"}
        img={"/img/hero/renzo-snowglobe.jpg"}
        species="Raccoon-Fox-Dragon"
        status={
          (["owned", "adopted", "hidden", "upForAdopt", "main"] as FursonaStatus[])[
            Math.floor(Math.random() * 5)
          ]
        }
        role="listitem"
        href="/@testing/character/renzo"
        likes={Math.floor(Math.random() * 100)}
      />
    ))
  }

  return (
    <MarginClamp>
      <div className="mx-auto my-20 flex  flex-col justify-between gap-y-2 md:mt-8 md:flex-col">
        <ShelfSection icon={Heart} title={"Featured Characters"}>
          <RandomizedFursonaCards />
        </ShelfSection>
        <ShelfSection icon={Sparkles} title={"Recently created characters"}>
          <RandomizedFursonaCards />
        </ShelfSection>
        {/* TODO create profile card and collections card */}
        <div>
          <div className="my-3 flex flex-row">
            <span className="flex flex-row items-center justify-center text-2xl font-bold">
              <Brush width={26} height={26} className="mr-2" />
              Artists Open for Comissions
            </span>
            <hr />
            <div />
          </div>
        </div>
        <div className="my-3 flex flex-row">
          <span className="flex flex-row items-center justify-center text-2xl font-bold">
            <Layers width={26} height={26} className="mr-2" />
            Curated Collections
          </span>
          <hr />
          <div />
        </div>
      </div>
    </MarginClamp>
  )
}
