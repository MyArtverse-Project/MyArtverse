"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Facebook, Google, XTwitter } from "@/components/icons"
import { Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
// import { InputField } from "@/components/ui/Forms"
import { emailRegex } from "@/constants"
import clsx from "clsx"

export default function LoginForm() {
  const [emailEntered, setEmailEntered] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const router = useRouter()

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

    const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL
    fetch(`${endpoint}/v1/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // TODO: Redirect to user's profile
          router.push(`/`)
        })
      }

      return res.json().then((data) => {
        switch (res.status) {
          case 400:
            // Invalid Login
            if (data.email) setEmailEntered(false)
            setEmailError(data.email)
            setPasswordError(data.password)
            break
          case 401:
            // Unauthorized -- Must need to be verified
            setEmailError(data.error)
            setEmailEntered(false)
            break
        }
      })
    })
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
        {errors.length > 0 && (
          <div className="flex flex-col gap-y-1.5">
            {errors.map((error, index) => (
              <span key={index} className="text-error">
                {error}
              </span>
            ))}
          </div>
        )}
        <form onSubmit={submitLogin} className="relative mb-40 w-full">
          <Separator dir="horizontal" padding="1.25rem" />
          <div
            className={clsx(
              "absolute left-0 top-0 w-full transform transition-all duration-500",
              emailEntered ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
            )}
          >
            {/* TODO: Temporary */}
            <div className="w-full">
              <label htmlFor="email" className="flex flex-col gap-y-1.5">
                <span
                  className={clsx(
                    "text-600 mt-4 flex gap-x-0.5 font-bold uppercase",
                    errors.length > 0 ? "text-error" : null
                  )}
                >
                  Email
                </span>
                <input
                  className="text-700 border-400 bg-100 mb-4 w-full rounded-md border px-4 py-2"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  aria-placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </label>
              <div>{emailError}</div>
            </div>
            <div className="text-center">
              <Button
                variant="primary"
                position="center"
                onClick={validateEmail}
                href="/login"
              >
                Next
              </Button>
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
            {/* TODO: Temporary */}
            <div className="w-full">
              <label htmlFor="password" className="flex flex-col gap-y-1.5">
                <span
                  className={clsx(
                    "text-600 mt-4 flex gap-x-0.5 font-bold uppercase",
                    errors.length > 0 ? "text-error" : null
                  )}
                >
                  Password
                </span>
                <input
                  className="text-700 border-400 bg-100 my-2 w-full rounded-md border px-4 py-2"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </label>
              <div>{passwordError}</div>
            </div>
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
