"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Fieldset, Note, Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import DropZone from "@/components/ui/Drop/DropZone"
import { FormWithProgress, InputField } from "@/components/ui/Forms"
import clsx from "clsx"
import { LuCreditCard as CreditCardIcon, LuLock as LockIcon } from "react-icons/lu"
import { UserType } from "@/types/users"

export default function CreateProfileForm({ userData }: { userData: UserType }) {
  const router = useRouter()
  if (!userData) router.push("/login")
  if (userData.displayName) router.push(`/profile/${userData.handle}`)

  const [displayName, setDisplayName] = useState("")
  const [errors, setErrors] = useState(null)
  const [isProfileComplete, setProfileComplete] = useState(false)

  // const [isConnectionsComplete, setConnectionsComplete] = useState(false)
  // const [isAuthComplete, setAuthComplete] = useState(false)
  // const [isPaymentComplete, setPaymentComplete] = useState(false)

  const progress = [
    {
      item: "Profile information",
      isComplete: isProfileComplete
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
          {`Hello, ${userData.handle}—we're so glad to have you on board! You're almost there,
          all we need is to get some of the nitty-gritty stuff done first. 
          Don't worry, you can change these anytime!`}
        </p>
      </section>
      <FormWithProgress progress={progress}>
        <main className="flex w-full flex-col gap-y-5">
          {/* Profile field */}
          <Fieldset heading="Profile information">
            <div className="flex flex-row justify-between gap-6">
              <div className="w-full">
                <label htmlFor="email" className="flex flex-col gap-y-1.5">
                  <span
                    className={clsx("text-600 mt-4 flex gap-x-0.5 font-bold uppercase")}
                  >
                    Display Name
                  </span>
                  <input
                    className="text-700 border-400 bg-100 mb-4 w-full rounded-md border px-4 py-2"
                    id="displayName"
                    name="displayName"
                    type="string"
                    placeholder="Display Name"
                    aria-placeholder="Display name"
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </label>
                <InputField
                  type="text"
                  inputName="Username"
                  value={`@${userData.handle}`}
                />
              </div>
              <div className="flex-shrink-0">
                <DropZone />
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
            <Button>Okay, I'm all set!</Button>
          </div>
        </main>
      </FormWithProgress>
    </>
  )
}
