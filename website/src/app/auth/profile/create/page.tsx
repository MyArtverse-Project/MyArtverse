"use client"

import { Button } from "@/components/ui/Buttons"
import Separator from "@/components/ui/Separator"
import { pageMeta } from "@/utils"
import { FacebookIcon, TwitterIcon, LogInIcon } from "lucide-react"
import Image from "next/image"

import { useRouter } from "next/navigation"
import { FormEvent, FormEventHandler, useState } from "react"

// export const metadata = pageMeta({
//   title: "Sign In - MyFursona",
//   description:
//     "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
// })

export default function SignUp() {
  const router = useRouter()
  const [emailEntered, setEmailEntered] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    const user = await response.json()
    console.log(user)
    router.push("/signin")

  }

  return (
    <div className="flex flex-col w-1/4 mx-auto my-20 ">
      {errors && errors.length !== 0 ? (
        <div>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      ) : null}
      <h2 className="my-4 text-3xl text-center">Sign Up</h2>
      <Button
        variant={"primary"}
        className="flex items-center justify-center w-full p-2 my-1 text-center transition-all ease-in-out border border-color-3 hover:bg-color-3"
        prefixIcon={<FacebookIcon />}
      >
        Continue with Facebook
      </Button>
      <Button
        variant={"primary"}
        className="flex items-center justify-center w-full p-2 my-1 text-center transition-all ease-in-out border border-color-3 hover:bg-color-3"
        prefixIcon={<TwitterIcon />}
      >
        Continue with X/Twitter
      </Button>
      <Separator dir="horizontal" padding="1.25rem" />
      <div className="relative w-full">
        <form onSubmit={submitRegister}>
          <input
            type="email"
            className="w-full px-4 py-2 my-1 border rounded-md border-color-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 my-1 border rounded-md border-color-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={emailChecker}
            className={`bg-color-3 hover:bg-color-4 my-2 w-full flex justify-center items-center py-2 px-4`}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => router.push("/auth/signin")}
            className={`bg-color-3 hover:bg-color-4 my-2 w-full flex justify-center items-center py-2 px-4`}
          >
            Already have an account?
          </Button>
        </form>
      </div>
    </div>
  )
}
