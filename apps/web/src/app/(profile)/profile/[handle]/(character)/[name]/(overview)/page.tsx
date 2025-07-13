import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { fetchCharacter, fetchSelfCharacter, fetchUserData, getPanels } from "@/utils/api"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import OverviewContent from "./OverviewContent"
import { DefineRouteParams } from "@/types"
import { User } from "@/app/context/AuthContext"

type AsyncProps = DefineRouteParams<{ handle: string; name: string }>

export async function generateMetadata(): Promise<Metadata> {
  // TODO add a simple check if their name ends with an "s"; for example "Dennis"
  // TODO it should display: "Dennis' characters", etc
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s characters`,
    description: `See ${userPlaceholder}'s characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page({ params }: AsyncProps) {
  const { handle, name } = await params
  const self = await fetchUserData() as unknown as User | null
  const character = await fetchCharacter(handle, name)
  const panels = await getPanels(handle, name)

  return (
    <MarginClamp>
      <OverviewContent character={character} self={self} panels={panels} />
    </MarginClamp>
  )
}
