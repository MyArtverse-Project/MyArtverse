import Link from "next/link"
import { MyFursonaIcon } from "@/components/icons"
import { Button, SearchButton } from "@/components/ui/Buttons"
import {
  LuBell as BellIcon,
  LuChevronDown as ChevronDownIcon,
  LuHelpCircle as HelpCircleIcon,
  LuMenu as MenuIcon,
  LuPlus as PlusIcon
} from "react-icons/lu"
import { BuiImage } from "@/components/ui"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20">
      <nav className="relative flex items-center justify-between px-5 py-3 text-sm font-medium select-none font-inter bg-100">
        <div className="font-inter flex gap-x-3.5 items-center text-xl">
          <Button iconOnly variant="tritery">
            <MenuIcon size={21} />
          </Button>
          <Link href="/" aria-label="Home" draggable={false}>
            <MyFursonaIcon logoOnly size={0.7} />
          </Link>
          <span className="opacity-50">/</span>
          <span className="font-bold">Dashboard</span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <SearchButton />
          <Button
            iconOnly
            variant="tritery"
            suffixIcon={<ChevronDownIcon size={18} />}
          >
            <PlusIcon size={21} />
          </Button>
          <Button iconOnly variant="tritery">
            <HelpCircleIcon size={21} />
          </Button>
          <Button iconOnly variant="tritery">
            <BellIcon size={21} />
          </Button>
          <BuiImage
            src="/img/examples/kuro/kuro-example4.png"
            aspectRatio="1"
            width={35}
            rounded
          />
        </div>
      </nav>
    </header>
  )
}
