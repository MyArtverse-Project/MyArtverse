"use client"

import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { Hyperlink } from "@/components/ui"
import AuthWall from "@/components/ui/AuthWall"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import Separator from "@/components/ui/Separator"
import cn from "@/utils/cn"
import { BACKEND_URL as endpoint } from "@/utils/env"

export default function RegisterForm() {
  // TODO: Switch to using actions instead of event form after MVP
  const router = useRouter()
  const [usernameError, setUsernameError] = useState("")
  const [username, setUsername] = useState("")
  const [emailError, setEmailError] = useState("")
  const [email, setEmail] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // dud function
  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError("Password must match")
      return
    }

    fetch(`${endpoint}/v1/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, username, password })
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          router.push("/verify")
        })
      }

      return res.json().then((data) => {
        switch (res.status) {
          case 400:
            // Email/Username Taken
            setUsername(data.username)
            setEmailError(data.email)
            setPasswordError(data.error)
            break
          case 401:
            break
        }
      })
    })
  }

  return (
    <main className="absolute inset-0 m-auto grid place-items-center px-8">
      <AuthWall heading="Register a new account">
        <div className="w-full">
          <Separator dir="horizontal" padding="0.15rem" />
        </div>
        <div className="relative w-full">
          <form
            onSubmit={submitRegister}
            className="flex flex-col justify-center gap-y-2"
          >
            {/* TODO: Temporary */}
            <div>
              <label htmlFor="username" className="flex flex-col gap-y-1.5">
                <span
                  className={cn(
                    "text-600 mt-1 flex gap-x-0.5 font-bold uppercase",
                    usernameError ? "text-error" : null
                  )}
                >
                  Username
                </span>
                <input
                  className="text-700 border-400 bg-100  w-full rounded-md border px-4 py-2"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Usernmae"
                  aria-placeholder="Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </label>
              <div>{usernameError}</div>
            </div>
            <div>
              <label htmlFor="email" className="flex flex-col gap-y-1.5">
                <span
                  className={cn(
                    "text-600 mt-1 flex gap-x-0.5 font-bold uppercase",
                    emailError ? "text-error" : null
                  )}
                >
                  Email
                </span>
                <input
                  className="text-700 border-400 bg-100  w-full rounded-md border px-4 py-2"
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
            <div>
              <label htmlFor="password" className="flex flex-col gap-y-1.5">
                <span
                  className={cn(
                    "text-600 mt-1 flex gap-x-0.5 font-bold uppercase",
                    passwordError ? "text-error" : null
                  )}
                >
                  Password
                </span>
                <input
                  className="text-700 border-400 bg-100  w-full rounded-md border px-4 py-2"
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
            <div>
              <label htmlFor="passwordConfirm" className="flex flex-col gap-y-1.5">
                <span
                  className={cn(
                    "text-600 mt-1 flex gap-x-0.5 font-bold uppercase",
                    passwordError ? "text-error" : null
                  )}
                >
                  Confirm password
                </span>
                <input
                  className="text-700 border-400 bg-100  w-full rounded-md border px-4 py-2"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-placeholder="Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </label>
              <div>{passwordError}</div>
            </div>
            <Button type="submit" position="center">
              Sign Up
            </Button>
          </form>
          <div className="mt-6 text-center">
            {"Already have an account? "}
            <Hyperlink href="/login">Sign in</Hyperlink>
          </div>
        </div>
      </AuthWall>
    </main>
  )
}
