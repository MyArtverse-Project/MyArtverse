import { getPanels } from "@/utils/api"
import OverviewContent from "./OverviewContent"
import { DashboardPanel } from "@/types/users"

export default async function ProfilePage({ params }: { params: { handle: string } }) {
  const { handle } = await params
  const panels = await getPanels(handle)
  return (
    <OverviewContent handle={handle} panels={panels}  />
  )
}
