import { redirect } from "next/navigation"
import { BACKEND_URL } from "@/utils/env"

export default function Page({ params }) {
  const { id } = params

  const verifyEmail = async () => {
    const endpoint = BACKEND_URL
    const res = fetch(`${endpoint}/v1/auth/verify/${id}`, {
      method: "POST",
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => true)
      }

      return res.json().then((data) => false)
    })

    return res
  }

  const verifiedEmail = verifyEmail()
  if (verifiedEmail) redirect("/login")
  else return <div>Unable to verify your email</div>
}
