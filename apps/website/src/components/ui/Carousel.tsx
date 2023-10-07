import { Button } from "./Buttons"
import Separator from "./Separator"
import { LuChevronRight as ChevronRight } from "react-icons/lu"

export default function Carousel({
  children,
  title,
  seeAllLink,
  as: Element = "div"
}: {
  children: React.ReactNode
  as?: keyof HTMLElementTagNameMap
  title?: NonNullable<React.ReactElement>
  seeAllLink?: string
}) {
  return (
    <Element id="carousel-root">
      <div className="flex items-center justify-between gap-x-1 px-3.5 py-2">
        <div>{title}</div>
        <Button
          href={!seeAllLink ? "/#" : seeAllLink}
          size="small"
          suffixIcon={<ChevronRight size={18} />}
          variant="tritery"
        >
          See all
        </Button>
      </div>
      <Separator dir="horizontal" padding="0.25rem" />
      <div id="carousel-contents">{children}</div>
    </Element>
  )
}
