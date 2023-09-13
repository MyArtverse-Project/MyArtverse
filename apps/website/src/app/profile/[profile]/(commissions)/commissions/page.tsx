import Comissions from "@/components/ui/Comissions/Comissions"
import Switch from "@/components/ui/Comissions/Switch"
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
            <Switch />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Comissions title="Banners" description="Awesome scene with 2+ Characters" imageURL="/img/hero/ozzy-sniff.png" price={30} key={1}  />
            <Comissions title="Banners" description="Awesome scene with 2+ Characters" imageURL="/img/hero/ozzy-sniff.png" price={30} key={1}  />
            <Comissions title="Banners" description="Awesome scene with 2+ Characters" imageURL="/img/hero/ozzy-sniff.png" price={30} key={1}  />
            <Comissions title="Banners" description="Awesome scene with 2+ Characters" imageURL="/img/hero/ozzy-sniff.png" price={30} key={1}  />
           </div>
        </div>
      </div>
    </Fragment>
  )
}
