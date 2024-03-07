import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { fetchUserData } from "@/utils/api"
import SignInForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Login"
}

export default async function SignIn() {
  const user = await fetchUserData().catch(() => {
    return null
  })
  if (user) redirect("/")
  return <SignInForm />
}
