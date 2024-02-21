import { Metadata, ResolvingMetadata } from "next"
import { MarginClamp } from "@/components/ui"
import { LuPalette as Palette } from "react-icons/lu"
import { SlugRouteProps } from "@/types/utils"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's Gallery`,
    description: `See User's artworks on MyFursona by creating an account!`
  }
}

export default function GalleryPage({ params }: SlugRouteProps) {
  return (
    <MarginClamp>
      <div className="max-w-screen-2xl py-4">
        <div className="border-error prose-p:mx-auto prose-p:leading-6 prose-p:mt-2 grid w-full place-items-center rounded-md border py-16 text-center">
          <div>
            <img src="/img/hero/ozzy-banner.png" alt="" className="h-4 w-4" />
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
