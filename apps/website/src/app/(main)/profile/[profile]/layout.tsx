import type { Metadata } from "next"
import { fetchUser, fetchUserCharacters } from "@/utils/api"
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
} & SlugRouteProps<{ profile: string; character: string }>) {
  const { character, profile } = params

  // Fetch user data from the API
  const userData = await fetchUser(profile)
  if (!userData) return null

  const characterData = character ? await fetchUserCharacters(profile) : null
  if (character && !characterData) return null

  return (
    <>
      <DynamicLayout profile={userData} character={characterData.mainCharacter} />
      <div>{children}</div>
    </>
  )
}
