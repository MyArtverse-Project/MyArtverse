import type { Metadata } from "next"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import type { DefineRouteParams } from "@/types"
import { BRAND } from "@mav/shared"

type AsyncProps = DefineRouteParams<{ handle: string }>

export async function generateMetadata(): Promise<Metadata> {
  // TODO add a simple check if their name ends with an "s"; for example "Dennis"
  // TODO it should display: "Dennis' characters", etc
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s characters`,
    description: `See ${userPlaceholder}'s characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page() {
  return (
    <MarginClamp>
      <div>e</div>
    </MarginClamp>
  )
}
