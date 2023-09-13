import { Palette } from "lucide-react"
import { Metadata, ResolvingMetadata } from "next"

import dynamic from "next/dynamic"
import { Fragment } from "react"

const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false })

type Props = {
  params: {
    profile: string
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's Gallery`,
    description: `See User's artworks on MyFursona by creating an account!`
  }
}

export default function GalleryPage({ params }: Props) {
  return (
    <Fragment>
      <div
        data-profile-contents=""
        className="py-4 max-w-screen-2xl"
      >
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
    </Fragment>
  )
}
