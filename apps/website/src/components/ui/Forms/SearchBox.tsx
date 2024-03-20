import { forwardRef } from "react"
import { LuSearch as SearchIcon } from "react-icons/lu"
import type { MapElement } from "@/types/utils"

const SearchBox = forwardRef(
  (
    {
      placeholder
    }: {
      placeholder?: string
    },
    ref: React.ForwardedRef<MapElement<"input">>
  ) => {
    return (
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-3.5 flex h-full items-center justify-center">
          <SearchIcon size={18} />
        </div>
        <input
          ref={ref}
          type="search"
          name="Search"
          className="bg-200 font-inter h-full w-full rounded-md border-none py-2 pl-10 pr-1 text-sm"
          placeholder={placeholder}
        />
      </div>
    )
  }
)

SearchBox.displayName = "SearchBox"

export default SearchBox
