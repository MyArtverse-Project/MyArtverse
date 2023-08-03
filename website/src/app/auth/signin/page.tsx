import { pageMeta } from "@/utils"
import SignInForm from "./SignInForm"

export const metadata = pageMeta({
  title: "Sign In - MyFursona",
  description: "Sign in or register on MyFursona"
})

export default function SignIn() {
  return <SignInForm />
}
