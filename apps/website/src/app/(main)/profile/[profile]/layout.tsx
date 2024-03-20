import type { Metadata } from "next"
import { fetchUser, fetchUserCharacters } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import type { SlugRouteProps } from "@/types/utils"
import DynamicLayout from "./DynamicLayout"

export async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
  const userHandleParam = params.profile

  return {
    title: {
      template: `%s (@${userHandleParam}) - MyFursona`,
      default: "Profile layout"
    },
    description: `Follow @${userHandleParam} on ${BRAND} by creating an account!`
  }
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
} & SlugRouteProps<{ profile: string; character: string }>) {
  const { character, profile } = params

  // Fetch user data from the API
  const userData = await fetchUser(profile)
  if (!userData) return null

  const characterData = character ? await fetchUserCharacters(profile) : null
  if (character && !characterData) return null

  return (
    <>
      {/* TODO: Remove all props to be retrieved directly from Jotai or react-query */}
      <DynamicLayout profile={userData} character={null} />
      <div>{children}</div>
    </>
  )
}
