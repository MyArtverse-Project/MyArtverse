import type { Metadata } from "next"
import { MFImage, Note } from "@/components/ui"
import Comments from "@/components/ui/Comments"
import { BRAND } from "@myfursona-internal/config"
import ArtworkDetails from "./ArtworkDetails"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: `Art title by Artist | ${BRAND}`
    },
    description: `Art description`
  }
}

export default function ArtPage() {
  return (
    <div className="flex">
      {/* Artwork image, details, and comments */}
      <div className="flex w-full flex-col">
        <div className="bg-100 relative h-[75dvh] select-none">
          <div
            className="absolute inset-x-12 inset-y-0 z-10"
            data-trigger-zoom-modal=""
          ></div>
          <div className="relative mx-auto grid h-full place-items-center px-12 py-5">
            <MFImage
              src="/img/examples/kuro/kuro-refsheet.png"
              alt=""
              width="100%"
              height="100%"
              objectFit="contain"
              strategy="important"
              sizes="2400px (max-width: 1400px)"
              quality={80}
            />
          </div>
        </div>
        {/* Artwork details, notes/alerts and comments */}
        <div className="mx-auto flex w-full flex-col gap-y-2 px-5 pt-6 min-[1400px]:w-[1024px]">
          <span className="mb-2.5">
            <Note type="info" inline>
              Generic info notice
            </Note>
          </span>
          <ArtworkDetails />
          <div>
            <Comments>
              <Comments.Field />
              <Comments.Item>nice</Comments.Item>
              <Comments.Item>very cool</Comments.Item>
            </Comments>
          </div>
        </div>
      </div>
      {/* More from this artist */}
      <aside className="w-96 flex-shrink-0 px-6 py-4">more stuff</aside>
    </div>
  )
}
