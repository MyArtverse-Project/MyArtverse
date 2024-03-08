import Link from "next/link"
import { MyFursonaIcon } from "../icons"

export default function NavbarLogo() {
  return (
    <>
      <div className="desktop-only-lg">
        <Link href="/" aria-label="Home" draggable={false}>
          <MyFursonaIcon size={0.69} />
        </Link>
      </div>
      <div className="mobile-only-lg">
        <Link href="/" aria-label="Home" title="Home">
          <MyFursonaIcon logoOnly size={0.69} />
        </Link>
      </div>
    </>
  )
}
