import { Button } from "@/components/ui/Buttons"
import { BuiImage } from "@/components/ui"
import { Brush, Heart, Layers, Sparkles } from "lucide-react"
import { FursonaCard } from "@/components/ui/Cards"
import { FursonaStatus } from "@/types/Fursonas"

export default function Browse() {
  return (
    <div className="flex flex-col lg:w-4/5 md:mt-8 md:flex-col justify-between w-4/5 mx-auto my-20">
      <div>
        {/* TODO: Featured Fursona into own Component */}
        <div className="flex flex-row my-3">
          <span className="flex flex-row text-2xl font-bold items-center justify-center">
            <Heart width={26} height={26} className="mr-2" />
            Featured Characters
          </span>
          {/* TODO: Filter Dropdowm */}
        </div>
        <hr />
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[...Array(7)].map((_, i) => (
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
          ))}
        </div>
      </div>
      <div className="my-4">
        <div className="flex flex-row my-3">
          <span className="flex flex-row text-2xl font-bold items-center justify-center">
            <Sparkles width={26} height={26} className="mr-2" />
            Recently Created Characters
          </span>
        </div>
        <hr />
        <div className="grid grid-cols-4 gap-4 mt-4 ">
          {/* TODO: Make it skinny */}
          {[...Array(7)].map((_, i) => (
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
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-row my-3">
          <span className="flex flex-row text-2xl font-bold items-center justify-center">
            <Brush width={26} height={26} className="mr-2" />
            Artists Open for Comissions
          </span>
          <hr />
          <div></div>
        </div>
      </div>
      <div className="flex flex-row my-3">
        <span className="flex flex-row text-2xl font-bold items-center justify-center">
          <Layers width={26} height={26} className="mr-2" />
          Curated Collections
        </span>
        <hr />
        <div></div>
      </div>
    </div>
  )
}
