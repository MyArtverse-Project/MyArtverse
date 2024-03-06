import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
import { fetchUser, fetchUserData } from "@/utils/api"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Register an account"
}

export default async function SignUp() {
  const user = await fetchUserData().catch(() => {
    return null
  })
  if (user) redirect("/")
  return <RegisterForm />
}
