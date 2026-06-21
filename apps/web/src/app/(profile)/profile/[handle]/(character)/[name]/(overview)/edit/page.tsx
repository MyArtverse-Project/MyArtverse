import type { DefineRouteParams } from "@/types"
import EditOverviewPage from "./EditOverview"

type AsyncProps = DefineRouteParams<{ handle: string, name: string }>

export default async function Page({ params }: AsyncProps) {
  const { handle, name } = await params

  return <EditOverviewPage handle={handle} name={name} />
}


