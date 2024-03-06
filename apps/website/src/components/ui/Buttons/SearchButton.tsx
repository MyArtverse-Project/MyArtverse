import { LuSearch as SearchIcon } from "react-icons/lu"
import type { MapElement } from "@/types/utils"
import Button from "./Button"

export default function SearchButton({
  onClick
}: {
  onClick?: React.MouseEventHandler<MapElement<"button"> & MapElement<"a">>
}) {
  return (
    <Button
      className="border-separator hover:border-dropdowns-text-field border:border-dropdowns-text-field flex items-center gap-x-1.5 rounded-md border py-2 pl-3 pr-24 lg:pr-32 xl:pr-48"
      prefixIcon={<SearchIcon size={19} />}
      onClick={onClick}
    >
      Search
    </Button>
  )
}
