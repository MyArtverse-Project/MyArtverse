import { Metadata, ResolvingMetadata } from "next"

import dynamic from "next/dynamic"
import ProfileMasthead from "./(overview)/ProfileMasthead"
import { AlertOctagon } from "lucide-react"
import { Fragment } from "react"

const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false })

type Props = {
  params: {
    profile: string
    slug: string
  }
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`
  return {
    title: `User (${decodeUserHandle})`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default function Layout({ params, children }: Props) {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`

  return (
    <Fragment>
      <ProfileMasthead handle={decodeUserHandle} />
      {/*
      
      Reimplmenting stuff

      <Masthead>
        <Masthead.Avatar src="./avatar.png" />
        <Masthead.Info followers={69} following={21} />
        <Masthead.Actions>
          <Button>Follow</Button>
          <Button>Report</Button>
          <Button>Block</Button>
        </Masthead.Actions>
      </Masthead>

      */}
      {children}
    </Fragment>
  )
}
