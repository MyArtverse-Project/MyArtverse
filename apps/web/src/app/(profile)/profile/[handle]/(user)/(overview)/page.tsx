import type { DefineRouteParams } from "@/types"
import { fetchUser, getPanels } from "@/utils/api"
import OverviewContent from "./OverviewContent"

type AsyncProps = DefineRouteParams<{ handle: string }>

export default async function ProfilePage({ params }: AsyncProps) {
  const { handle } = await params
  const userData = await fetchUser(handle)
  const panels = await getPanels(handle)
  return <OverviewContent handle={handle} panels={panels} userData={userData} />
}
