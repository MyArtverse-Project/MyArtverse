"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { signIn, useSession } from "next-auth/react"
import { FacebookIcon, TwitterIcon } from "lucide-react"

import { emailRegex } from "@/constants"
import { Button } from "@/components/ui/Buttons"
import Separator from "@/components/ui/Separator"

export default function SignInForm() {
  // !!!!! code duplication detected !!!!!
  // TODO: 1. use the useReducer() hook to combine all of these useStates
  // TODO: 2. recommended to create a useClientAuth() custom hook to resolve code dup
  // TODO: and also sharable for signup form too
  // !!!!! code duplication detected !!!!!
  const { status, data } = useSession()
  const router = useRouter()
  const [emailEntered, setEmailEntered] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  useEffect(() => {
    console.log("USE EFFECT ")
    if (status === "authenticated" && data) {
      console.log("LOGGED")
      router.push("/")
    }
    console.log("NOT LOGGED")
  }, [status, data, router])

  const emailChecker = () => {
    if (!email) return

    if (emailRegex.exec(email)?.length === 1) {
      setErrors([])
      return setEmailEntered(true)
    }

    return setErrors(["Email is invalid!"])
  }

  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn("credentials", { email, password, redirect: false })
    router.push("/")
  }

  return (
    <div className="flex flex-col w-1/4 mx-auto my-16 mb-40">
      {errors && errors.length !== 0 ? (
        <div>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      ) : null}
      <h2 className="my-4 text-3xl text-center">Sign In</h2>
      <Button variant="primary" prefixIcon={<FacebookIcon />}>
        Continue with Facebook
      </Button>
      <Button variant="primary" prefixIcon={<TwitterIcon />}>
        Continue with Twitter
      </Button>
      <Separator dir="horizontal" padding="1.25rem" />
      <form onSubmit={submitLogin} className="relative w-full">
        <div
          className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
            emailEntered ? "-translate-x-full" : "translate-x-0"
          } ${emailEntered ? "opacity-0" : "opacity-100"}`}
        >
          <input
            type="text"
            className="w-full px-4 py-2 my-1 border rounded-md border-color-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={emailChecker}>Next</Button>
          <Button href="/auth/signup">Sign Up</Button>
        </div>
        <div
          className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
            emailEntered ? "translate-x-0" : "translate-x-full"
          } ${emailEntered ? "opacity-100" : "opacity-0"}`}
        >
          <input
            type="password"
            className="w-full px-4 py-2 my-1 border rounded-md border-color-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          <Button onClick={() => setEmailEntered(false)}>Previous</Button>
        </div>
      </form>
    </div>
  )
}
