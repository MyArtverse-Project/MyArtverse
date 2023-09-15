import { FursonaCard } from "@/components/ui/Cards"
import { FolderView } from "@/components/ui"
import { Metadata, ResolvingMetadata } from "next"

import dynamic from "next/dynamic"

const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false })

type Props = {
  params: {
    profile: string
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on MyFursona by creating an account!`
  }
}

export default function Page({ params }: Props) {
  return (
    <>
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
    </>
  )
}
