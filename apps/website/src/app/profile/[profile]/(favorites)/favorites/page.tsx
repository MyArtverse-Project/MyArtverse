import { Metadata, ResolvingMetadata } from "next"

import dynamic from "next/dynamic"
import { Fragment } from "react"

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
    title: `User's Favorites`,
    description: `See User's favorites and more on MyFursona by creating an account!`
  }
}

export default function FavoritesPage({ params }: Props) {
  return (
    <Fragment>
      <p>Favoites</p>
    </Fragment>
  )
}
