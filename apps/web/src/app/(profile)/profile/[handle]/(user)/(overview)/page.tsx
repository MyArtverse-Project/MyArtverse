import { DefineRouteParams } from "@/types"
import { getPanels } from "@/utils/api"
import OverviewContent from "./OverviewContent"

type AsyncProps = DefineRouteParams<{ handle: string }>

export default async function ProfilePage({ params }: AsyncProps) {
  const { handle } = await params
  const panels = await getPanels(handle)
  return <OverviewContent handle={handle} panels={panels} />
}
