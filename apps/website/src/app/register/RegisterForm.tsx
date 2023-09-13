"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/Buttons"
import Separator from "@/components/ui/Separator"
import { emailRegex } from "@/constants"
import { Facebook, XTwitter } from "@/components/icons"
import { BuiLink } from "@/components/ui"
import { InputField } from "@/components/ui/Forms"

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
    <main className="flex flex-col w-1/4 mx-auto my-20">
      {errors && errors.length !== 0 ? (
        <div>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      ) : null}
      <h2 className="not-prose font-bold font-inter my-4 text-3xl text-center">
        Sign Up
      </h2>
      <div className="grid gap-y-1.5 w-full">
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
          className="flex justify-center flex-col"
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
    </main>
  )
}
