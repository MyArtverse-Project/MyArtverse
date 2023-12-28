"use client"

import { Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { CommissionsListing } from "@/components/ui/Cards"
import SearchBox from "@/components/ui/Forms/SearchBox"

export default function ListingPage() {
  return (
    <>
      <div className="flex gap-x-1 sticky top-32 pb-3.5 bg-100 z-[3]">
        <Button variant="secondary">Commissions</Button>
        <Button variant="secondary">YCHs</Button>
        <Button variant="secondary">Adoptables</Button>
        <Separator dir="vertical" padding={6} />
        <SearchBox placeholder="Find a listing" />
      </div>
      <div className="grid px-4 prose-p:w-2/3 prose-p:mx-auto prose-p:leading-6 prose-p:mt-2">
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
    </>
  )
}
