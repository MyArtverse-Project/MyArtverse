import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
import { fetchUserData } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import AuthWall from "../AuthWall"

const LoginForm = dynamic(() => import("./LoginForm"))

export const metadata: Metadata = {
  title: "Login"
}

export default async function SignIn() {
  const user = await fetchUserData().catch(() => {
    return null
  })
  if (user) redirect("/")

  return (
    <AuthWall heading={`Log in to ${BRAND}`}>
      <LoginForm />
    </AuthWall>
  )
}
