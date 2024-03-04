import type { Metadata } from "next"
import SignInForm from "./LoginForm"

export const metadata: Metadata = {
  title: { absolute: "Login to MyFursona" }
}

export default function SignIn() {
  return <SignInForm />
}
