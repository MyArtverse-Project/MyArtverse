import type { Metadata } from "next"
import { MarginClamp } from "@/components/ui"
import { BRAND } from "@myfursona-internal/config"
import { LuPalette as Palette } from "react-icons/lu"

// TODO get user data from Jotai global store
export const metadata: Metadata = {
  title: `User's Gallery`,
  description: `See User's gallery on ${BRAND} by creating an account!`
}

export default function GalleryPage() {
  return (
    <MarginClamp>
      <div className="max-w-screen-2xl py-4">
        <div className="border-error prose-p:mx-auto prose-p:leading-6 prose-p:mt-2 grid w-full place-items-center rounded-md border py-16 text-center">
          <div>
            <span>OzzyTheDev</span>
            <div>
              <button>Prices</button>
              <button>
                <Palette />
                Queue
              </button>
            </div>
          </div>
        </div>
      </div>
    </MarginClamp>
  )
}
