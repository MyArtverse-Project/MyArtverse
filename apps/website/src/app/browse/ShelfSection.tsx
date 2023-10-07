import { Carousel, GridResponsive } from "@/components/ui"
import type { IconType } from "react-icons"

export default function ShelfSection({
  children,
  icon: Icon,
  title
}: {
  children?: React.ReactNode
  icon?: IconType
  title?: string
}) {
  return (
    <Carousel
      as="section"
      title={
        <span className="flex items-center gap-x-1 font-bold font-inter text-2xl">
          <Icon size="1.3rem" className="mr-2" />
          {title}
        </span>
      }
    >
      <GridResponsive className="mt-3 gap-1" breakpoint={210} role="listbox">
        {children}
      </GridResponsive>
    </Carousel>
  )
}
