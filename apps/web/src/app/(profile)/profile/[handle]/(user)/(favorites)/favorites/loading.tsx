import { CharacterCard } from "@/components/Cards"
import { MarginClamp, GridResponsive } from "@/components/Containers"

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
