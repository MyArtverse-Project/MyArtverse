"use client"

import Image from "next/image"

import { Button } from "@/components/ui/Buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faYoutube,
  faXTwitter,
  faTelegram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons"
import {
  AlertTriangleIcon,
  BrushIcon,
  CatIcon,
  HeartIcon,
  HomeIcon,
  LayoutGridIcon,
  MoreVerticalIcon,
  UserPlusIcon
} from "lucide-react"
import Link from "next/link"
import Tabs from "@/components/ui/Tabs"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"
import Socials from "@/components/ui/Socials"

export default function ProfileHero({
  handle
}: {
  handle: string
  isNSFW?: boolean
}) {
  return (
    <div
      data-profile-hero=""
      style={{ "--profile-banner-parallax": 1 } as React.CSSProperties}
    >
      <div className="relative aspect-[15/3]">
        <div className="absolute inset-0 z-[3]" />
        <div data-banner-credits="" className="absolute z-[3] bottom-4 right-6">
          <span>Banner credits: </span>
          <Link href="/" aria-hidden>
            <span>Rokento</span>
          </Link>
        </div>
        <Image
          src="/img/hero/ozzy-banner.png"
          alt=""
          role="presentation"
          className="object-cover w-full overflow-hidden rounded-bl-2xl rounded-br-2xl"
          quality={90}
          draggable="false"
          fill
          priority
          style={{
            objectPosition: "0 calc(50% * var(--profile-banner-parallax, 1))"
          }}
        />
      </div>
      <div className="px-12 mx-auto max-w-screen-2xl">
        <section className="flex gap-x-2.5 h-fit">
          {/* Avatar */}
          <div className="relative flex-shrink-0 w-[var(--avatar-size)] h-[calc(var(--avatar-size)/1.25)]">
            <div className="w-[var(--avatar-size)] absolute -top-12 aspect-square overflow-hidden border-4 rounded-full border-100 bg-100">
              <Image
                fill
                priority
                loading="eager"
                src="/img/examples/ozzy/5.png"
                alt={`Avatar of Username`}
                sizes="(min-width: 1200px) 200px"
                className="object-cover"
                draggable="false"
              />
            </div>
          </div>
          {/* Username details */}
          <div className="flex flex-col w-full pt-4 gap-y-2">
            {/* layer 1 - username */}
            <div className="flex justify-between">
              <h2 className="text-3xl flex items-center gap-x-1.5">
                <span>Username</span>
                <span id="badge-shelf" aria-hidden></span>
              </h2>
              <div className="flex items-start gap-x-2.5 relative z-0">
                <Button
                  prefixIcon={<BrushIcon size={20} />}
                  aria-label="View Username's Commissions"
                  variant="secondary"
                >
                  Commission ToS
                </Button>
                <Button
                  prefixIcon={<UserPlusIcon size={20} />}
                  aria-label="Follow Username"
                >
                  Follow
                </Button>
                <Dropdown
                  button={
                    <Button
                      iconOnly
                      prefixIcon={<MoreVerticalIcon size={20} />}
                      aria-label="More"
                    ></Button>
                  }
                  items={
                    <>
                      <DropdownItem link="/">Manage trades</DropdownItem>
                      <DropdownItem link="/">Report Username</DropdownItem>
                    </>
                  }
                />
              </div>
            </div>
            {/* layer 2 - handles and followers */}
            <div className="flex gap-x-3.5">
              <span id="user-handle" className="font-semibold text-700">
                {handle}
              </span>
              <span className="inline-flex items-center font-semibold gap-x-1 text-error">
                <AlertTriangleIcon size={19} />
                <span>NSFW</span>
              </span>
              <span id="user-followers" className="text-700">
                69 followers
              </span>
              <span id="user-following" className="text-700">
                21 following
              </span>
            </div>
            {/* layer 3 - socials */}
            <div className="flex gap-x-2.5 pt-1.5">
              <Socials items={[{ platform: "Website", link: "baby" }]} />
            </div>
          </div>
        </section>
        <Tabs
          tabs={[
            { icon: HomeIcon, text: "Home", link: "/" },
            {
              icon: CatIcon,
              text: "Characters",
              link: "/",
              countIndicator: 5
            },
            { icon: LayoutGridIcon, text: "Gallery", link: "/" },
            { icon: BrushIcon, text: "Commissions", link: "/" },
            {
              icon: HeartIcon,
              text: "Favorites",
              link: "/",
              countIndicator: 69
            }
          ]}
        />
      </div>
    </div>
  )
}
