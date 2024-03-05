import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
import { fetchUser, fetchUserData } from "@/utils/api"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Register an account"
}

export default function SignUp() {
  const user = fetchUserData()
  if (user) redirect("/")
  return <RegisterForm />
}
