import {
  LuBrush as Brush,
  LuHeart as Heart,
  LuLayers as Layers,
  LuSparkles as Sparkles
} from "react-icons/lu"
import { FursonaCard } from "@/components/ui/Cards"
import ShelfSection from "./ShelfSection"
import { MarginClamp } from "@/components/ui"
import { FursonaStatus } from "@/types"

export default function Browse() {
  const RandomizedFursonaCards = () => {
    return [...Array(7)].map((_, i) => (
      <FursonaCard
        key={i}
        name={"Renzo"}
        img={"/img/hero/renzo-snowglobe.jpg"}
        species="Raccoon-Fox-Dragon"
        status={
          (
            [
              "owned",
              "adopted",
              "hidden",
              "upForAdopt",
              "main"
            ] as FursonaStatus[]
          )[Math.floor(Math.random() * 5)]
        }
        role="listitem"
        href="/er"
        likes={Math.floor(Math.random() * 100)}
      />
    ))
  }

  return (
    <MarginClamp>
      <div className="flex flex-col gap-y-2  md:mt-8 md:flex-col justify-between mx-auto my-20">
        <ShelfSection icon={Heart} title={"Featured Characters"}>
          <RandomizedFursonaCards />
        </ShelfSection>
        <ShelfSection icon={Sparkles} title={"Recently created characters"}>
          <RandomizedFursonaCards />
        </ShelfSection>
        {/* TODO create profile card and collections card */}
        <div>
          <div className="flex flex-row my-3">
            <span className="flex flex-row text-2xl font-bold items-center justify-center">
              <Brush width={26} height={26} className="mr-2" />
              Artists Open for Comissions
            </span>
            <hr />
            <div />
          </div>
        </div>
        <div className="flex flex-row my-3">
          <span className="flex flex-row text-2xl font-bold items-center justify-center">
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
