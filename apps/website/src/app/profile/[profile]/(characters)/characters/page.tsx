import { FursonaCard } from "@/components/ui/Cards"
import { FolderView } from "@/components/ui/Folders"
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
    <div className="flex gap-x-4">
      <FolderView />
      <div
        className="w-full grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
        role="listbox"
      >
        {[...Array(10)].map((_, i) => (
          <FursonaCard
            key={i}
            name={"Renzo"}
            img={"/img/hero/renzo-snowglobe.jpg"}
            species="Raccoon-Fox-Dragon"
            status="notForAdopt"
            role="listitem"
          />
        ))}
      </div>
    </div>
  )
}
