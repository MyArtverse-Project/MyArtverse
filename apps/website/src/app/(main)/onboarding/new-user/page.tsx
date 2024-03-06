import type { Metadata } from "next"
import { useRouter } from "next/navigation"
import { fetchUserData } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import CreateProfileForm from "./CreateProfileForm"

export const metadata: Metadata = {
  title: {
    absolute: `Welcome to ${BRAND}!`
  }
}

export default async function Page() {
  const userData = await fetchUserData()

  return <CreateProfileForm userData={userData}  />
}
