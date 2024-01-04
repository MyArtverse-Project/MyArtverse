"use client"

import { MarginClamp } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { Listing } from "@/components/ui/Cards"
import { Dropdown } from "@/components/ui/Dropdown"
import SearchBox from "@/components/ui/Forms/SearchBox"
import { Menu } from "@headlessui/react"
import { LuChevronDown, LuStickyNote } from "react-icons/lu"

export default function ListingPage() {
  return (
    <>
      <div className="sticky top-[7.1rem] py-3.5 -mt-3 bg-100 z-[3]">
        <div className="flex gap-x-3 max-w-screen-2xl mx-auto px-12">
          <SearchBox placeholder="Find a listing" />
          <Dropdown
            button={
              <Button
                variant="secondary"
                suffixIcon={<LuChevronDown size={21} />}
              >
                Type
              </Button>
            }
            items={
              <>
                <Menu.Item>
                  <Button position="left" variant="tritery">
                    Commissions
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button position="left" variant="tritery">
                    YCHs
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button position="left" variant="tritery">
                    Adoptable
                  </Button>
                </Menu.Item>
              </>
            }
          />
          <Button
            variant="primary"
            prefixIcon={<LuStickyNote size={21} />}
            suffixIcon={<LuChevronDown size={21} />}
          >
            New
          </Button>
        </div>
      </div>
      <MarginClamp>
        <div className="grid grid-cols-3 gap-3">
          <Listing
            title="Banners"
            description="Awesome scene with 2+ Characters"
            img="/img/hero/ozzy-sniff.png"
            price={30}
          />
          <Listing
            title="Banners"
            description="Awesome scene with 2+ Characters"
            img="/img/hero/ozzy-sniff.png"
            price={30}
          />
          <Listing
            title="Banners"
            description="Awesome scene with 2+ Characters"
            img="/img/hero/ozzy-sniff.png"
            price={30}
          />
          <Listing
            title="Banners"
            description="Awesome scene with 2+ Characters"
            img="/img/hero/ozzy-sniff.png"
            price={30}
          />
        </div>
      </MarginClamp>
    </>
  )
}
