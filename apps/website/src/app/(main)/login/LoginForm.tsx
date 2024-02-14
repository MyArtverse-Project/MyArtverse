"use client"

import { FormEvent, useState } from "react"
import { Facebook, Google, XTwitter } from "@/components/icons"
import { Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { emailRegex } from "@/constants"
import clsx from "clsx"

export default function LoginForm() {
  const [emailEntered, setEmailEntered] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // TODO export this function as a custom hook as `useValidateEmail()` so it can be used to the signup page as well
  const validateEmail = () => {
    if (!email) return

    if (emailRegex.exec(email)?.length === 1) {
      setErrors([])
      return setEmailEntered(true)
    }

    return setErrors(["Email is invalid!"])
  }

  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const thirdPartyProviders = [
    {
      icon: Google,
      platform: "Google"
    },
    {
      icon: Facebook,
      platform: "Facebook"
    },
    {
      icon: XTwitter,
      platform: "X"
    }
  ]

  return (
    <main className="absolute inset-0 m-auto grid max-w-md place-items-center px-8">
      <div className="w-full">
        <h2 className="not-prose font-inter my-4 text-center text-3xl font-bold">
          Log in to MyFursona
        </h2>
        <div className="grid w-full gap-y-1.5">
          {thirdPartyProviders.map(({ icon: Icon, platform }, index) => (
            <Button
              key={index}
              variant="secondary"
              position="center"
              prefixIcon={<Icon size={19} />}
              aria-label={`Login with ${platform}`}
            >
              {`Login with ${platform}`}
            </Button>
          ))}
        </div>
        <form onSubmit={submitLogin} className="relative mb-40 w-full">
          <Separator dir="horizontal" padding="1.25rem" />
          <div
            className={clsx(
              "absolute left-0 top-0 w-full transform transition-all duration-500",
              emailEntered ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
            )}
          >
            <InputField
              inputName="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={validateEmail}>Next</Button>
            </div>
            <div className="my-3 text-center">
              <Button variant="secondary" position="center" href="/register">
                Create an account
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              "absolute left-0 top-0 w-full transform transition-all duration-500",
              emailEntered ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
          >
            <InputField
              inputName="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button
              className="bg-300 hover:bg-400 focus:bg-400 my-2 flex w-full items-center gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2 transition-[border,background-color]"
              type="submit"
            >
              Login
            </Button>
            <Button
              className="bg-300 hover:bg-400 focus:bg-400 my-2 flex w-full items-center gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2 transition-[border,background-color]"
              onClick={() => setEmailEntered(false)}
            >
              Previous
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
