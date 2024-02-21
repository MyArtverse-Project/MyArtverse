import { Metadata } from "next"
import type { SlugRouteProps } from "@/types/utils"
import DynamicMasthead from "./DynamicMasthead"

export async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const userHandleParam = params.profile!

  return {
    title: {
      template: `%s (@${userHandleParam}) - MyFursona`,
      default: "Profile layout"
    },
    description: `Follow @${userHandleParam} on MyFursona by creating an account!`
  }
}

export default function Layout({
  params,
  children
}: SlugRouteProps & { children: React.ReactNode }) {
  const profile = params.profile

  return (
    <>
      <DynamicMasthead handle={profile} />
      <div className="py-4">{children}</div>
    </>
  )
}
