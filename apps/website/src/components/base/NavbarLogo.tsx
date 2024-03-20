import Link from "next/link"
import { BRAND } from "@myfursona-internal/config"
import { MyFursonaIcon } from "../icons"
import { Badge } from "../ui/Badges"

export default function NavbarLogo() {
  return (
    <>
      <div className="desktop-only-lg flex items-center gap-x-1.5">
        <Link href="/" aria-label="Home" draggable={false}>
          <MyFursonaIcon size={0.69} />
        </Link>
        <div className="group relative cursor-help">
          <Badge className="uppercase">Alpha</Badge>
          <div className="bg-300 pointer-events-none absolute top-8 w-[25rem] rounded-md p-3 opacity-0 transition-opacity group-hover:opacity-100 group-hover:delay-300">
            {BRAND} is alpha release and still currently in development. Most of the
            features may be broken or not work as expected.
          </div>
        </div>
      </div>
      <div className="mobile-only-lg">
        <Link href="/" aria-label="Home" title="Home">
          <MyFursonaIcon logoOnly size={0.69} />
        </Link>
      </div>
    </>
  )
}
