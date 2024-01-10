import { SlugRouteProps } from "@/types"
import { LuPalette as Palette } from "react-icons/lu"
import { Metadata, ResolvingMetadata } from "next"
import { MarginClamp } from "@/components/ui"

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
      <div className="py-4 max-w-screen-2xl">
        <div className="grid py-16 text-center border rounded-md place-items-center border-error w-full prose-p:mx-auto prose-p:leading-6 prose-p:mt-2">
          <div>
            <img src="/img/hero/ozzy-banner.png" alt="" className="w-4 h-4" />
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
