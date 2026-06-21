import { CharacterCard } from "@/components/layouts/Cards"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"

export default function Loading() {
  return (
    <MarginClamp>
      {/* For 8 times generate a dummy fursona card */}
      <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
        {Array.from({ length: 8 }, (_, index) => (
          <CharacterCard loading={true} key={index} />
        ))}
      </GridResponsive>
    </MarginClamp>
  )
}
