import { LuSearch } from "react-icons/lu"

export default function NavbarSearch() {
  return (
    <div className="relative w-5/12">
      <span className="pointer-events-none absolute bottom-0 left-3.5 top-0 inline-flex items-center">
        <LuSearch size={19} />
      </span>
      <input
        className="text-700 bg-200 border-separator placeholder:font-inter w-full rounded-md border py-2 pl-10 pr-4 text-sm"
        placeholder="Search messages, commissions, and menus"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  )
}
