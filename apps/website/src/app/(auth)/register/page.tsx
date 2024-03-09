import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { fetchUserData } from "@/utils/api"
import AuthWall from "../AuthWall"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
  title: "Register an account"
}

export default async function SignUp() {
  const user = await fetchUserData().catch(() => {
    return null
  })
  if (user) redirect("/")

  return (
    <AuthWall heading="Register a new account">
      <RegisterForm />
    </AuthWall>
  )
}
