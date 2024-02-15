"use client"

import Link from "next/link"
import { MyFursonaIcon } from "@/components/icons"
import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import {
  LuBell as BellIcon,
  LuHelpCircle as HelpCircleIcon,
  LuAlbum,
  LuCat,
  LuFileLock,
  LuShare,
  LuMenu as MenuIcon,
  LuPlus as PlusIcon,
  LuSearch as SearchIcon
} from "react-icons/lu"

export default function DashboardNavbar() {
  const createNewItems = [
    { icon: LuCat, name: "New fursona" },
    { icon: LuShare, name: "Upload image(s)" },
    { icon: LuAlbum, name: "New collection" },
    { icon: LuFileLock, name: "New private note" }
  ]
  return (
    <nav className="font-inter bg-100 border-b-mute relative flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium">
      <div className="font-inter flex items-center gap-x-2.5 text-xl">
        <Button iconOnly variant="tritery">
          <MenuIcon size={21} />
        </Button>
        <Link href="/" aria-label="Home" draggable={false}>
          <MyFursonaIcon logoOnly size={0.7} />
        </Link>
        <div className="border-600 mx-1 block h-7 rotate-[18deg] border-[2px] border-b-0 border-l-0 opacity-70" />
        <span className="text-2xl font-bold">Studio</span>
      </div>
      {/* Search input */}
      <div className="relative w-1/3">
        <span className="pointer-events-none absolute bottom-0 left-3.5 top-0 inline-flex items-center">
          <SearchIcon size={19} />
        </span>
        <input
          className="text-700 bg-200 border-separator placeholder:font-inter w-full rounded-md border py-2 pl-10 pr-4 text-sm"
          placeholder="Search messages, commissions, and menus"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
      <div className="flex items-center gap-x-1.5">
        <Button iconOnly variant="tritery">
          <HelpCircleIcon size={21} />
        </Button>
        <Button iconOnly variant="tritery">
          <BellIcon size={21} />
        </Button>
        <Button variant="secondary" prefixIcon={<PlusIcon size={21} />}>
          Create
        </Button>
        <span className="ml-3">
          <MFImage
            src="/img/examples/kuro/kuro-example4.png"
            aspectRatio="1"
            width={35}
            rounded={999}
          />
        </span>
      </div>
    </nav>
  )
}
