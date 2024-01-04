import Button from "./Button"
import { LuSearch as SearchIcon } from "react-icons/lu"

export default function SearchButton({
  onClick
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement>
}) {
  return (
    <Button
      className="rounded-md flex items-center gap-x-1.5 pl-3 pr-24 lg:pr-32 xl:pr-48 py-2 border border-separator hover:border-dropdowns-text-field border:border-dropdowns-text-field"
      prefixIcon={<SearchIcon size={20} />}
      onClick={onClick}
    >
      Search
    </Button>
  )
}
