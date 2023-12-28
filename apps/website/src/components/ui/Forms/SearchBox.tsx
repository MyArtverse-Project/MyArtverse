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
        <div className="absolute h-full flex justify-center items-center left-3 pointer-events-none">
          <SearchIcon size={18} />
        </div>
        <input
          ref={ref}
          type="search"
          name="Search"
          className="pl-9 pr-1 py-2 text-sm rounded-md w-full h-full"
          placeholder={placeholder}
        />
      </div>
    )
  }
)

SearchBox.displayName = "SearchBox"

export default SearchBox
