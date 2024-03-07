import type { Metadata } from "next"
import SignInForm from "./LoginForm"
import { fetchUserData } from "@/utils/api"
import { redirect } from "next/navigation"

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
