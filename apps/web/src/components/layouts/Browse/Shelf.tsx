import Carousel from "./Carousel"
import GridResponsive from "../Layouts/GridResponsive"

export default function ShelfSection({
  children,
  icon,
  title
}: {
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}) {
  return (
    <Carousel
      as="section"
      title={
        <span className="font-inter flex items-center gap-x-1 text-2xl font-bold">
          {icon}
          {title}
        </span>
      }
    >
      <GridResponsive className="mt-3 gap-1" breakpoint={250} role="listbox">
        {children}
      </GridResponsive>
    </Carousel>
  )
}
