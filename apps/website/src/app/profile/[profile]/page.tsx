import { Avatar, Button } from "@/components/ui/Buttons"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

import { useRouter } from "next/navigation"
import ProfileHero from "./ProfileHero"
import { AlertOctagon } from "lucide-react"

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
    <div className="relative -top-[4.6rem] -mb-[4.6rem]">
      <ProfileHero handle={decodeUserHandle} />
      <div
        id="profile-contents"
        className="px-12 py-4 mx-auto max-w-screen-2xl"
      >
        <div className="grid px-4 py-16 text-center border rounded-md place-items-center border-error prose-p:w-2/3 prose-p:mx-auto prose-p:leading-6 prose-p:mt-2">
          <div className="p-4 rounded-lg bg-error-hl">
            <AlertOctagon size={48} strokeWidth={2} />
          </div>
          <h2 className="pt-3 pb-1.5 text-3xl">This username is reserved</h2>
          <p>
            We reserve names that are blacklisted, generally considered
            derogatory, offensive, inappropriate, or otherwise not in accordance
            to our Community Guidelines will be permanently barred from
            creation.
          </p>
          <p>
            In some cases, we can also reserve specific usernames for those
            looking to claim their profile on MyFursona.
          </p>
        </div>
      </div>
    </div>
  )
}
