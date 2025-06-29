import { fetchUserData } from "@/utils/api"
import SecuritySettings from "./SecuritySettings"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Profile"
}

export default async function SettingsProfilePage() {
  const user = await fetchUserData()
  if (!user) return redirect("/login")
  return (
    <SecuritySettings user={user} />
  )
}
