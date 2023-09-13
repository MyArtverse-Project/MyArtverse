import type { Metadata } from "next"
import SignInForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Login"
}

export default function SignIn() {
  return <SignInForm />
}
