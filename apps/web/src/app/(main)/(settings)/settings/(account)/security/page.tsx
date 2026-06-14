import { fetchUserData } from "@/utils/api"
import { redirect } from "next/navigation"
import SecuritySettings from "./SecuritySettings"

export const metadata = {
  title: "Profile"
}

export default async function SettingsProfilePage() {
  const user = await fetchUserData()
  if (!user) return redirect("/login")
  return <SecuritySettings user={user} />
}
