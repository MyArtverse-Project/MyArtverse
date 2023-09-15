import { Metadata, ResolvingMetadata } from "next"

import { Commissions } from "@/components/ui/Cards"
import { Switch } from "@/components/ui"

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
    title: `User's Commissions`,
    description: `Follow User on new commission updates on MyFursona by creating an account!`
  }
}

export default function Page({ params }: Props) {
  return (
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
        <Commissions
          title="Banners"
          description="Awesome scene with 2+ Characters"
          imageURL="/img/hero/ozzy-sniff.png"
          price={30}
          key={1}
        />
        <Commissions
          title="Banners"
          description="Awesome scene with 2+ Characters"
          imageURL="/img/hero/ozzy-sniff.png"
          price={30}
          key={1}
        />
        <Commissions
          title="Banners"
          description="Awesome scene with 2+ Characters"
          imageURL="/img/hero/ozzy-sniff.png"
          price={30}
          key={1}
        />
        <Commissions
          title="Banners"
          description="Awesome scene with 2+ Characters"
          imageURL="/img/hero/ozzy-sniff.png"
          price={30}
          key={1}
        />
      </div>
    </div>
  )
}
