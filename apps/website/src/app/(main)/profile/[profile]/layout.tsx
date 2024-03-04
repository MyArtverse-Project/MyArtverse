import type { Metadata } from "next"
import { fetchUserData } from "@/utils/api"
import { UserType } from "@/types/users"
import type { SlugRouteProps } from "@/types/utils"
import DynamicLayout from "./DynamicLayout"

export async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const userHandleParam = params.profile

  return {
    title: {
      template: `%s (@${userHandleParam}) - MyFursona`,
      default: "Profile layout"
    },
    description: `Follow @${userHandleParam} on MyFursona by creating an account!`
  }
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: { profile: string }
}) {
  // Fetch user data from the API
  const userData = await fetchUserData()
  if (!userData) return null
  // TODO: Add Character API Logic
  return (
    <>
      <DynamicLayout profile={userData} />
      <div>{children}</div>
    </>
  )
}
