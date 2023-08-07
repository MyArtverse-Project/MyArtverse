import { Avatar, Button } from "@/components/ui/Buttons"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

import { useRouter } from "next/navigation"
import ProfileHero from "./ProfileHero"

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
    title: `User (${decodeUserHandle})`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default function Page({ params }: Props) {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `@${params.profile}`

  return (
    <>
      <ProfileHero handle={decodeUserHandle} />
      <div id="profile-contents">Contents here</div>
    </>
  )
}
