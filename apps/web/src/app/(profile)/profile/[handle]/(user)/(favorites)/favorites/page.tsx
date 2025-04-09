import { FursonaCard } from "@/components/Cards"
import GridResponsive from "@/components/Containers/GridResponsive"
import { MarginClamp } from "@/components/Containers"

import { getFavorites } from "@/utils/api"
import { BRAND } from "@mav/shared"
import { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"

export async function generateMetadata(): Promise<Metadata> {
  // TODO add a simple check if their name ends with an "s"; for example "Dennis"
  // TODO it should display: "Dennis' characters", etc
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s characters`,
    description: `See ${userPlaceholder}'s characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = (await params) as { handle: string }
  const favs = await getFavorites(handle)

  return (
    <MarginClamp>
      <Suspense fallback={<Loading />}>
        <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
          {favs.map((character, index) => (
            <FursonaCard
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              key={index}
              palette={
                character.refSheets.length > 0
                  ? character.refSheets[0].colors
                  : []
              }
              href={`/@${character.owner.handle}/character/${character.name}`}
            />
          ))}
        </GridResponsive>
      </Suspense>
    </MarginClamp>
  )
}
