import { Metadata, ResolvingMetadata } from "next"
import { AlertOctagon } from "lucide-react"
import { EmptySection } from "@/components/ui"

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
  const decodeUserHandle = params.profile
  return {
    title: `User`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default function Page() {
  return (
    <EmptySection icon={AlertOctagon}>
      <EmptySection.Heading>This username is reserved</EmptySection.Heading>
      <p>
        We reserve names that are blacklisted, generally considered derogatory,
        offensive, inappropriate, or otherwise not in accordance to our
        Community Guidelines will be permanently barred from creation.
      </p>
      <p>
        In some cases, we can also reserve specific usernames for those looking
        to claim their profile on MyFursona.
      </p>
    </EmptySection>
  )
}
