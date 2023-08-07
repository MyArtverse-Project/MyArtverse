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
import { MoreVerticalIcon, UserPlusIcon } from "lucide-react"
import Link from "next/link"

export default function ProfileHero({ handle }: { handle: string }) {
  return (
    <div
      data-profile-hero=""
      style={{ "--profile-banner-parallax": 1 } as React.CSSProperties}
    >
      <div className="relative mx-9" style={{ aspectRatio: "16 / 3" }}>
        <Image
          src="/img/hero/ozzy-banner.png"
          alt=""
          role="presentation"
          className="object-cover w-full overflow-hidden rounded-md"
          quality={90}
          draggable="false"
          fill
          priority
          style={{
            objectPosition: "0 calc(50% * var(--profile-banner-parallax, 1))"
          }}
        />
        <div data-banner-credit="" className="absolute bottom-4 right-6">
          Banner credits:{" "}
          <Link href="/">
            <span>Rokento</span>
          </Link>
        </div>
      </div>
      <div className="px-12 mx-auto max-w-screen-2xl">
        <section className="flex gap-x-2.5 h-fit">
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
          <div className="flex flex-col w-full pt-4 gap-y-2">
            <h2 className="text-3xl flex items-center gap-x-1.5">
              <span>Username</span>
              <span id="badge-shelf" aria-hidden></span>
            </h2>
            <div className="flex gap-x-3.5">
              <span className="font-semibold text-700">{handle}</span>
              <span className="text-700">69 followers</span>
              <span className="text-700">21 following</span>
            </div>
            <div className="flex gap-x-2.5 pt-1.5">
              <Button
                className="p-0"
                prefixIcon={
                  <FontAwesomeIcon icon={faFacebook} size="xl" fixedWidth />
                }
              />
              <Button
                className="p-0"
                prefixIcon={
                  <FontAwesomeIcon icon={faYoutube} size="xl" fixedWidth />
                }
              />
              <Button
                className="p-0"
                prefixIcon={
                  <FontAwesomeIcon icon={faXTwitter} size="xl" fixedWidth />
                }
              />
              <Button
                className="p-0"
                prefixIcon={
                  <FontAwesomeIcon icon={faTelegram} size="xl" fixedWidth />
                }
              />
              <Button
                className="p-0"
                prefixIcon={
                  <FontAwesomeIcon icon={faLinkedin} size="xl" fixedWidth />
                }
              />
            </div>
          </div>
          <div className="flex items-start gap-x-2.5 pt-4">
            <Button
              prefixIcon={<UserPlusIcon size={20} />}
              aria-label="Follow Username"
            >
              Follow
            </Button>
            <Button
              iconOnly
              prefixIcon={<MoreVerticalIcon size={20} />}
              aria-label="More"
            ></Button>
          </div>
        </section>
        <div id="tabs" className="flex">
          Tab container
        </div>
      </div>
    </div>
  )
}
