import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Linktree } from "../icons"

import { fab } from "@fortawesome/free-brands-svg-icons"
import { IconName, library } from "@fortawesome/fontawesome-svg-core"
import type { ResolveToFontAwesome, Socials } from "@/types/Socials"
import Link from "next/link"
library.add(fab)

export default function Socials({ items }: { items?: Socials }) {
  // TODO try and find a way to exchange FA components, Lucide Icons, and local components
  const resolveToFA: ResolveToFontAwesome = {
    "Battle.net": "battle-net",
    "Apple Music": "itunes-note",
    WhatsApp: "whatsapp"
  }


  return (
    <div data-social-shelf="">
      {items.map(({ link, platform }, index) => (
        <Link href={link} key={index}>
          {/* <FontAwesomeIcon
            icon={["fab", resolveToFA[platform] as IconName]}
            size="lg"
            fixedWidth
          /> */}
        </Link>
      ))}
    </div>
  )
}
