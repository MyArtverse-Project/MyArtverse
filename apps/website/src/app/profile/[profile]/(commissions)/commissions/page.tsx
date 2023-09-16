import { Metadata, ResolvingMetadata } from "next"
import { CommissionsListing } from "@/components/ui/Cards"
import { Switch } from "@/components/ui"
import type { SlugRouteProps } from "@/types"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's Commissions`,
    description: `Follow User on new commission updates on MyFursona by creating an account!`
  }
}

export default function Page({ params }: SlugRouteProps) {
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
        <CommissionsListing
          title="Banners"
          description="Awesome scene with 2+ Characters"
          img="/img/hero/ozzy-sniff.png"
          price={30}
        />
        <CommissionsListing
          title="Banners"
          description="Awesome scene with 2+ Characters"
          img="/img/hero/ozzy-sniff.png"
          price={30}
        />
        <CommissionsListing
          title="Banners"
          description="Awesome scene with 2+ Characters"
          img="/img/hero/ozzy-sniff.png"
          price={30}
        />
        <CommissionsListing
          title="Banners"
          description="Awesome scene with 2+ Characters"
          img="/img/hero/ozzy-sniff.png"
          price={30}
        />
      </div>
    </div>
  )
}
