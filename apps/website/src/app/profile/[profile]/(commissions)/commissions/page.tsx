import { Palette } from "lucide-react"
import { Metadata, ResolvingMetadata } from "next"

import dynamic from "next/dynamic"
import Image from "next/image"
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
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`
  return {
    title: `User (${decodeUserHandle})`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default function Page({ params }: Props) {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`

  return (
    <Fragment>
      <div
        data-profile-contents=""
        className="px-12 py-4 mx-auto max-w-screen-2xl"
      >
        <div className="grid px-4 prose-p:w-2/3 prose-p:mx-auto prose-p:leading-6 prose-p:mt-2">
          <div className="flex flex-row items-center">
            <img
              src="/img/hero/ozzy-banner.png"
              alt=""
              className="w-16 h-16 rounded-full mr-2"
            />
            <span className="text-xl font-bold">OzzyTheDev</span>
            <div className="flex flex-row p-2.5 border border-300 rounded-md mx-4 items-center text-center justify-center">
              <div className="bg-500 text-100 w-32 h-9 fkex flex-row justify-center my-auto rounded-md">
                <span className="my-auto">Prices</span>
              </div>
              <div className="bg-500 text-100 w-32 h-9 flex flex-row text-center justify-center items-center rounded-md">
                <Palette className="mr-2" width={24} height={24} />
                Queue
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col text-left items-start justify-start">
              <Image
                // objectFit="cover"
                // layout="fill"
                width="568"
                height="156"
                src="/img/hero/ozzy-sniff.png"
                alt=""
              />
              <div className="flex flex-col justify-start">
                <h3 className="text-4xl no-prose">Banners - $45+</h3>
                <p className="no-prose text-left mx-0">Wallpaper IDK</p>
                <p className="no-prose text-left mx-0">
                  Each extra character is $50 extra
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <Image
                // objectFit="cover"
                // layout="fill"
                width="568"
                height="156"
                src="/img/hero/ozzy-sniff.png"
                alt=""
              />
              <h1>Banners - $45+</h1>
              <p>Wallpaper IDK</p>
              <p>Each extra character is $50 extra</p>
            </div>
            <div className="flex flex-col">
              <Image
                // objectFit="cover"
                // layout="fill"
                width="568"
                height="156"
                src="/img/hero/ozzy-sniff.png"
                alt=""
              />
              <h1>Banners - $45+</h1>
              <p>Wallpaper IDK</p>
              <p>Each extra character is $50 extra</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
