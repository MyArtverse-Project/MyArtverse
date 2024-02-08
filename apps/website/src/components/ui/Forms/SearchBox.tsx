import { forwardRef } from "react"
import { LuSearch as SearchIcon } from "react-icons/lu"

const SearchBox = forwardRef(
  (
    {
      placeholder
    }: {
      placeholder?: string
    },
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-3 flex h-full items-center justify-center">
          <SearchIcon size={18} />
        </div>
        <input
          ref={ref}
          type="search"
          name="Search"
          className="bg-100 h-full w-full rounded-md py-2 pl-9 pr-1 text-sm"
          placeholder={placeholder}
        />
      </div>
    )
  }
)

SearchBox.displayName = "SearchBox"

export default SearchBox
