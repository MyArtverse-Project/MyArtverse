"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import AuthWall from "@/components/ui/AuthWall"
import { Button } from "@/components/ui/Buttons"
// import { InputField } from "@/components/ui/Forms"
import { emailRegex } from "@/constants"
import { BACKEND_URL } from "@/utils/env"
import { BRAND } from "@myfursona-internal/config"
import clsx from "clsx"
import { LuChevronLeft } from "react-icons/lu"

export default function LoginForm() {
  const router = useRouter()

  const [emailEntered, setEmailEntered] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)

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

    const endpoint = BACKEND_URL
    fetch(`${endpoint}/v1/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then((res) => {
      const jsonResponse = res.json()

      if (res.ok) {
        return jsonResponse.then(() => {
          // TODO: Redirect to user's profile
          router.push(`/`)
        })
      }

      return jsonResponse.then((data) => {
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

  return (
    <main className="absolute inset-0 m-auto grid place-items-center px-8">
      <AuthWall heading="Log in">
        <div className="w-full">
          <form onSubmit={submitLogin} className="relative mb-96">
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
                    type="email"
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
            </div>
            <div
              className={clsx(
                "absolute left-0 top-0 w-full transform transition-all duration-500",
                emailEntered ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              )}
            >
              {/* TODO: Temporary */}
              <div className="w-full">
                <Button
                  className="bg-300 hover:bg-400 focus:bg-400 my-2 flex w-full items-center gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2 transition-[border,background-color]"
                  prefixIcon={<LuChevronLeft />}
                  onClick={() => setEmailEntered(false)}
                  variant="secondary"
                >
                  {email}
                </Button>
                <label htmlFor="password" className="flex flex-col gap-y-1.5">
                  <span
                    className={clsx(
                      "text-600 mt-0 flex gap-x-0.5 font-bold uppercase",
                      errors.length > 0 ? "text-error" : null
                    )}
                  >
                    Password
                  </span>
                  <input
                    className="text-700 border-400 bg-100 mb-2 w-full rounded-md border px-4 py-2"
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
            </div>
          </form>
        </div>
        <div>
          <span className="mr-2">New to {BRAND}?</span>
          <Link
            href="/register?from=login-prompt"
            className="text-blue-400 hover:underline"
          >
            Create a new account
          </Link>
        </div>
      </AuthWall>
    </main>
  )
}
