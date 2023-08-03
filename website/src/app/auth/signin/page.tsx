import { pageMeta } from "@/utils"
import SignInForm from "./SignInForm"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const metadata = pageMeta({
  title: "Sign In - MyFursona",
  description: "Sign in or register on MyFursona"
})

export default function SignIn() {
  return <SignInForm />
}
