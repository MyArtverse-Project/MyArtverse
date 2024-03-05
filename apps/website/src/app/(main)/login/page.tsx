import type { Metadata } from "next"
import SignInForm from "./LoginForm"
import { fetchUserData } from "@/utils/api"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: { absolute: "Login to MyFursona" }
}

export default async function SignIn() {
  const user = fetchUserData()
  if (user) redirect("/")
  return <SignInForm />
}
