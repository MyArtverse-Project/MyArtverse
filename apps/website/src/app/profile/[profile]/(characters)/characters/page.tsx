import { Metadata, ResolvingMetadata } from "next"
import type { SlugRouteProps } from "@/types"
import { FursonaCard } from "@/components/ui/Cards"
import { FolderView } from "@/components/ui"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on MyFursona by creating an account!`
  }
}

export default function Page({ params }: SlugRouteProps) {
  return (
    <FolderView>
      <FolderView.Shelf>
        <FolderView.Item name="Icons" />
        <FolderView.Item name="Adopts" />
        <FolderView.Item name="Fursuits" />
      </FolderView.Shelf>
      <FolderView.Contents>
        {[...Array(10)].map((_, i) => (
          <FursonaCard
            key={i}
            name={"Renzo"}
            img={"/img/hero/renzo-snowglobe.jpg"}
            species="Raccoon-Fox-Dragon"
            status="owned"
            role="listitem"
          />
        ))}
      </FolderView.Contents>
    </FolderView>
  )
}
