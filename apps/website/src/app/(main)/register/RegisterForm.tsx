"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Facebook, Google, XTwitter } from "@/components/icons"
import { BuiLink } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import Separator from "@/components/ui/Separator"
import { emailRegex } from "@/constants"

export default function RegisterForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<string[]>([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // dud function
  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <main className="absolute inset-0 m-auto grid max-w-md place-items-center px-8">
      <div className="w-full">
        {errors && errors.length !== 0 ? (
          <div>
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        ) : null}
        <h2 className="not-prose font-inter my-4 text-center text-3xl font-bold">
          Sign Up
        </h2>
        <div className="grid w-full gap-y-1.5">
          <Button variant="secondary" prefixIcon={<Google />} position="center">
            Continue with Google
          </Button>
          <Button variant="secondary" prefixIcon={<Facebook />} position="center">
            Continue with Facebook
          </Button>
          <Button variant="secondary" prefixIcon={<XTwitter />} position="center">
            Continue with X
          </Button>
        </div>
        <Separator dir="horizontal" padding="1.25rem" />
        <div className="relative w-full">
          <form
            onSubmit={submitRegister}
            className="flex flex-col justify-center gap-y-2"
          >
            <InputField
              required
              inputName="Username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              required
              inputName="Email"
              type="email"
              placeholder="bluefloof@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              required
              type="password"
              inputName="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              required
              type="password"
              inputName="Confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" position="center">
              Sign Up
            </Button>
          </form>
          <div className="mt-6 text-center">
            {"Already have an account? "}
            <BuiLink href="/login">Sign in</BuiLink>
          </div>
        </div>
      </div>
    </main>
  )
}
