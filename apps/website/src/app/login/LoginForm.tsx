"use client"

import { FormEvent, useState } from "react"
import { emailRegex } from "@/constants"
import clsx from "clsx"
import { Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { Facebook, Google, XTwitter } from "@/components/icons"

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
    <main className="grid place-items-center m-auto max-w-md absolute inset-0 px-8">
      <div className="w-full">
        <h2 className="not-prose font-bold font-inter my-4 text-3xl text-center">
          Log in to MyFursona
        </h2>
        <div className="grid gap-y-1.5 w-full">
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
        <form onSubmit={submitLogin} className="relative w-full mb-40">
          <Separator dir="horizontal" padding="1.25rem" />
          <div
            className={clsx(
              "absolute top-0 left-0 w-full transition-all duration-500 transform",
              emailEntered
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
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
            <div className="text-center my-3">
              <Button variant="secondary" position="center" href="/register">
                Create an account
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              "absolute top-0 left-0 w-full transition-all duration-500 transform",
              emailEntered
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            )}
          >
            <InputField
              inputName="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button
              className="flex items-center gap-x-1.5 rounded-md transition-[border,background-color] border-[2px] px-4 py-2 border-transparent bg-300 hover:bg-400 focus:bg-400 w-full my-2"
              type="submit"
            >
              Login
            </Button>
            <Button
              className="flex items-center gap-x-1.5 rounded-md transition-[border,background-color] border-[2px] px-4 py-2 border-transparent bg-300 hover:bg-400 focus:bg-400 w-full my-2"
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
