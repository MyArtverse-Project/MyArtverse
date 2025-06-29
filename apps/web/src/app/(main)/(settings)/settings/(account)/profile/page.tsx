import { fetchUserData } from "@/utils/api"
import ProfileSettings from "./ProfileSettings"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Profile"
}

export default async function SettingsProfilePage() {
  const user = await fetchUserData()
  if (!user) return redirect("/login")
  // TODO: Update API
  return (
    <ProfileSettings user={user} />
  )
}
