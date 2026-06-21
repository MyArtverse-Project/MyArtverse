import type { DefineRouteParams } from "@/types"
import { buildUserProfileMetadata } from "@/utils/artworkMetadata"
import { fetchUser, getPanels } from "@/utils/api"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import OverviewContent from "./OverviewContent"

type AsyncProps = DefineRouteParams<{ handle: string }>

export async function generateMetadata({
  params,
}: AsyncProps): Promise<Metadata> {
  const { handle } = await params

  try {
    const user = await fetchUser(handle)

    return buildUserProfileMetadata({
      displayName: user.displayName ?? handle,
      handle,
      bio: user.bio,
      avatarUrl: user.avatarUrl ?? null,
    })
  } catch {
    return buildPageMetadata({
      title: "Profile",
      description: `View a profile on ${BRAND}.`,
      path: `/@${handle}`,
    })
  }
}

export default async function ProfilePage({ params }: AsyncProps) {
  const { handle } = await params
  const userData = await fetchUser(handle)
  const panels = await getPanels(handle)
  return <OverviewContent handle={handle} panels={panels} userData={userData} />
}
