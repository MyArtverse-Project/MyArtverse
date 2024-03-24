"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Fieldset } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { FormWithProgress, InputField } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Forms/DropZone"
import { BACKEND_URL } from "@/utils/env"
import type { UserType } from "@/types/users"

export default function CreateProfileForm({ userData }: { userData: UserType }) {
  const router = useRouter()
  if (!userData) router.push("/login")
  if (userData.displayName) router.push(`/profile/${userData.handle}`)

  const [displayName, setDisplayName] = useState("")
  const [pronouns, setPronouns] = useState("")
  const [birthday, setBirthday] = useState("")
  const [avatarLink, setAvatarLink] = useState("")

  const submitProfile = async () => {
    const res = await fetch(`${BACKEND_URL}/v1/profile/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        displayName,
        pronouns,
        birthday,
        avatarLink
      })
    })

    if (res.ok) {
      router.push(`/profile/${userData.handle}`)
    } else {
      throw new Error("Failed to submit profile")
    }
  }

  // const [isConnectionsComplete, setConnectionsComplete] = useState(false)
  // const [isAuthComplete, setAuthComplete] = useState(false)
  // const [isPaymentComplete, setPaymentComplete] = useState(false)

  const progress = [
    {
      item: "Profile information",
      isComplete: true
    }
    // {
    //   item: "Connections",
    //   isComplete: isConnectionsComplete
    // },
    // {
    //   item: "Authentication",
    //   isComplete: isAuthComplete
    // },
    // {
    //   item: "Payment methods",
    //   isComplete: isPaymentComplete
    // }
  ]

  return (
    <>
      <section className="mx-auto mb-12 mt-20 max-w-screen-xl px-9 text-center">
        <h1 className="not-prose font-inter bg-gradient-to-tl from-blue-500 via-purple-700 to-pink-500 bg-clip-text text-4xl font-bold !leading-[4.25rem] text-transparent xl:text-5xl">
          Welcome to MyArtverse!
        </h1>
        <p className="text-base xl:text-lg xl:!leading-8">
          {`Hello, ${displayName ? displayName : userData.handle}—we're so glad to have you on board! You're almost there,
          all we need is to get some of the nitty-gritty stuff done first. 
          Don't worry, you can change these anytime!`}
        </p>
      </section>
      <FormWithProgress progress={progress}>
        <main className="flex w-full flex-col gap-y-5">
          {/* Profile field */}
          <Fieldset heading="Profile information">
            <div className="flex flex-row justify-between gap-6">
              <div className="w-full space-y-4">
                <InputField
                  type="text"
                  inputName="Display Name"
                  onChange={(e) => setDisplayName(e.currentTarget.value)}
                />
                <InputField
                  type="text"
                  inputName="Username"
                  value={`@${userData.handle}`}
                />
                <InputField
                  type="date"
                  inputName="Birthday"
                  onChange={(e) => setBirthday(e.currentTarget.value)}
                />
                <InputField
                  type="text"
                  inputName="Pronouns"
                  onChange={(e) => setPronouns(e.currentTarget.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <DropZone setData={setAvatarLink} />
              </div>
            </div>
          </Fieldset>
          {/* Connections field */}
          {/* <Fieldset
            heading="Connections"
            description={
              <div className="flex flex-col gap-y-2">
                <span>
                  Optional, you can skip this and add them from Account Settings at
                  anytime. Add connections such as social media and donations associated
                  to your account that will be displayed on your profile.
                </span>
                <span>
                  Note that there are some connections that might display additional
                  metadata, you can change their visibility later.
                </span>
              </div>
            }
          >
            <Fieldset.Inner> */}
          {/* <div className="flex flex-wrap gap-2">
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
              </div> */}
          {/* <Separator dir="horizontal" padding="0.75rem" />
              <Note type="info" inline>
                {"Any platforms missing or have a suggestions to add? "}
                <Link href="/profile/create#" className="text-info underline">
                  Let us know!
                </Link>
              </Note>
            </Fieldset.Inner>
          </Fieldset> */}
          {/* Payment field */}
          {/* <Fieldset
            heading="Payment methods"
            description="Optional, you can skip this and add them from Account Settings at anytime. Add your preferred payment method(s) when commissioning an artist or purchasing a physical goodies on MyFursona."
          >
            <Fieldset.Inner>
              <div className="flex flex-wrap gap-x-2">
                <Button prefixIcon={<CreditCardIcon size={21} />}>
                  Credit/Debit card
                </Button>
                <Button prefixIcon={<CreditCardIcon size={21} />}>PayPal</Button>
                <Button prefixIcon={<CreditCardIcon size={21} />}>Stripe</Button>
                <Button prefixIcon={<CreditCardIcon size={21} />}>Square</Button>
                <Button prefixIcon={<CreditCardIcon size={21} />}>Klarna</Button>
              </div>
            </Fieldset.Inner>
          </Fieldset> */}
          {/* Auth field */}
          {/* <Fieldset
            heading="Authentication"
            description={
              <>
                Optional but <em>highly recommended</em>. You can skip this and add them
                from Account Settings at anytime. Protect your account with an additional
                layer of security with two-factor authentication.
              </>
            }
          >
            <Button prefixIcon={<LockIcon size={21} />}>Setup 2FA</Button>
          </Fieldset> */}
          <div className="flex justify-end">
            <Button onClick={submitProfile}>Okay, I'm all set!</Button>
          </div>
        </main>
      </FormWithProgress>
    </>
  )
}
