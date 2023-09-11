"use client"

import { useState } from "react"
import Link from "next/link"

import type { IconName } from "@fortawesome/fontawesome-svg-core"
import { CreditCardIcon, LockIcon } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fieldset, Note, Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { FormWithProgress } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Drop/DropZone"

export default function CreateProfileForm() {
  const [displayName, setDisplayName] = useState("")
  // TODO: Check if the user has created an account, if so... redirect them to their profile
  const username = "FluffyJane"

  const [isProfileComplete, setProfileComplete] = useState(true)
  const [isConnectionsComplete, setConnectionsComplete] = useState(false)
  const [isAuthComplete, setAuthComplete] = useState(true)
  const [isPaymentComplete, setPaymentComplete] = useState(false)

  const progress = [
    {
      item: "Profile information",
      isComplete: isProfileComplete
    },
    {
      item: "Connections",
      isComplete: isConnectionsComplete
    },
    {
      item: "Authentication",
      isComplete: isAuthComplete
    },
    {
      item: "Payment methods",
      isComplete: isPaymentComplete
    }
  ]

  // TODO export these lil shits into their own component like lucide icons
  const socialIcons: IconName[] = [
    "youtube",
    "facebook",
    "x-twitter",
    "instagram",
    "twitch",
    "tiktok",
    "github",
    "telegram",
    "discord",
    "reddit",
    "tumblr",
    "threads",
    "deviantart",
    "artstation",
    "soundcloud",
    "spotify",
    "itunes-note",
    "patreon",
    "bandcamp",
    "xbox",
    "steam",
    "battle-net",
    "dribbble"
  ]

  return (
    <>
      <section
        className="max-w-screen-xl mt-20 mb-12 mx-auto px-9 text-center"
        data-new-user-onboarding=""
      >
        <h1 className="not-prose font-bold font-inter !leading-[4.25rem] text-4xl xl:text-5xl bg-gradient-to-tl from-blue-700 via-purple-700 to-pink-500 text-transparent bg-clip-text">
          Welcome to MyFursona
        </h1>
        <p className="xl:text-xl xl:!leading-8 text-lg">
          {`Hello, ${username}—we're so glad to have you on board! You're almost there,
          all we need is to get some of the nitty-gritty stuff done first. 
          Don't worry, you can change these anytime!`}
        </p>
      </section>
      <FormWithProgress progress={progress}>
        <div className="w-full flex flex-col gap-y-5">
          {/* Profile field */}
          <Fieldset heading="Profile information">
            <div className="flex flex-row justify-between">
              <div>
                <div className="my-3">
                  <label htmlFor="display" className="my-3 font-bold text-lg">
                    DISPLAY NAME
                  </label>
                  <input
                    type="display"
                    className="w-full px-4 py-2 my-1 border rounded-md border-color-3 text-black"
                    placeholder=""
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="user" className="my-3 font-bold text-lg">
                    USERNAME
                  </label>
                  <input
                    type="user"
                    className="w-full px-4 py-2 my-1 border rounded-md border-color-3 text-black"
                    placeholder="@ozzythdev"
                    value={`@${username}`}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
              <DropZone />
            </div>
          </Fieldset>
          {/* Connections field */}
          <Fieldset
            heading="Connections"
            description={
              <div className="flex flex-col gap-y-2">
                <span>
                  Optional, you can skip this and add them from Account Settings
                  at anytime. Add connections such as social media and donations
                  associated to your account that will be displayed on your
                  profile.
                </span>
                <span>
                  Note that there are some connections that might display
                  additional metadata, you can change their visibility later.
                </span>
              </div>
            }
          >
            <div className="bg-100 p-3.5 border border-300 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {socialIcons.map((icon, i) => (
                  <Button
                    key={i}
                    iconOnly
                    prefixIcon={
                      <FontAwesomeIcon
                        icon={["fab", icon]}
                        fixedWidth
                        size="2x"
                      />
                    }
                  ></Button>
                ))}
              </div>
              <Separator dir="horizontal" padding="0.75rem" />
              <Note type="info" inline>
                {"Any platforms missing or have a suggestions to add? "}
                <Link href="/profile/create#" className="text-info underline">
                  Let us know!
                </Link>
              </Note>
              y{" "}
            </div>
          </Fieldset>
          {/* Payment field */}
          <Fieldset
            heading="Payment methods"
            description="Optional, you can skip this and add them from Account Settings at anytime. Add your preferred payment method(s) when commissioning an artist or purchasing a physical goodies on MyFursona."
          >
            <div className="bg-100 p-3.5 border border-300 rounded-lg">
              <div className="flex gap-x-2 flex-wrap">
                <Button prefixIcon={<CreditCardIcon size={21} />}>
                  Credit/Debit card
                </Button>
                <Button
                  prefixIcon={
                    <FontAwesomeIcon
                      icon={["fab", "paypal"]}
                      fixedWidth
                      size="lg"
                    />
                  }
                >
                  PayPal
                </Button>
                <Button
                  prefixIcon={
                    <FontAwesomeIcon
                      icon={["fab", "stripe-s"]}
                      fixedWidth
                      size="lg"
                    />
                  }
                >
                  Stripe
                </Button>
                <Button prefixIcon={<CreditCardIcon size={21} />}>
                  Square
                </Button>
                <Button prefixIcon={<CreditCardIcon size={21} />}>
                  Klarna
                </Button>
              </div>
            </div>
          </Fieldset>
          {/* Auth field */}
          <Fieldset
            heading="Authentication"
            description={
              <>
                Optional but <em>highly recommended</em>. You can skip this and
                add them from Account Settings at anytime. Protect your account
                with an additional layer of security with two-factor
                authentication.
              </>
            }
          >
            <Button prefixIcon={<LockIcon size={21} />}>Setup 2FA</Button>
          </Fieldset>
          <div className="flex justify-end">
            <Button>Okay, I'm all set!</Button>
          </div>
        </div>
      </FormWithProgress>
    </>
  )
}
