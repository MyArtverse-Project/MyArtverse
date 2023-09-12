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
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`
  return {
    title: `User's characters`,
    description: `See User's characters and others on MyFursona by creating an account!`
  }
}

export default function Page({ params }: Props) {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`

  return (
    <Fragment>
      <p>CHARAVTERS</p>
    </Fragment>
  )
}
