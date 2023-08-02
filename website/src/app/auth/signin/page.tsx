"use client"

import { Button } from "@/components/ui/Buttons"
import Separator from "@/components/ui/Separator"
import { pageMeta } from "@/utils"
import { FacebookIcon, TwitterIcon, LogInIcon } from "lucide-react"
import Image from "next/image"

import { useRouter } from "next/navigation"
import { useState } from "react"

export const metadata = pageMeta({
  title: "Sign In - MyFursona",
  description:
    "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
})

export default function SignIn() {
  const router = useRouter()
  
  const [emailEntered, setEmailEntered] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailChecker = () => {
    if (!email) return

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (EMAIL_REGEX.exec(email)?.length === 1) {
      setErrors([])
      return setEmailEntered(true)
    }

    return setErrors(["Email is invalid!"])
  }

  const submitLogin = () => {
    // TODO: Implement Sign In Functionality with AuthJS
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
      <Button
        variant={"primary"}
        className="flex items-center justify-center w-full p-2 my-1 text-center transition-all ease-in-out border border-color-3 hover:bg-color-3"
        prefixIcon={<FacebookIcon />}
      >
        Login with Facebook
      </Button>
      <Button
        variant={"primary"}
        className="flex items-center justify-center w-full p-2 my-1 text-center transition-all ease-in-out border border-color-3 hover:bg-color-3"
        prefixIcon={<TwitterIcon />}
      >
        Login with Twitter
      </Button>
      <Separator dir="horizontal" padding="1.25rem" />
      <div className="relative w-full">
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
          <Button
            onClick={emailChecker}
            className={`bg-color-3 hover:bg-color-4 my-2 w-full flex justify-center items-center py-2 px-4`}
          >
            Next
          </Button>
          <Button
            onClick={() => router.push("/auth/signup")}
            className={`bg-color-3 hover:bg-color-4 my-2 w-full flex justify-center items-center py-2 px-4`}
          >
            Sign Up
          </Button>
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
          <Button
            onClick={() => {}}
            className={`w-full flex items-center  justify-center py-2 px-4 bg-color-3 my-2 transition-all duration-500 `}
          >
            Login
          </Button>
          <Button
            onClick={() => setEmailEntered(false)}
            className={`w-full flex items-center  justify-center py-2 px-4 bg-color-3 my-2 transition-all duration-500`}
          >
            Previous
          </Button>
        </div>
      </div>
    </div>
  )
}
