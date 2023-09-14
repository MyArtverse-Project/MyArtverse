import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
  title: "Register an account"
}

export default function SignUp() {
  return <RegisterForm />
}
