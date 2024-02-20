import { Metadata, ResolvingMetadata } from "next"
import type { SlugRouteProps } from "@/types"
import DynamicMasthead from "./DynamicMasthead"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `${params.profile}`
  return {
    title: {
      template: `%s (@${decodeUserHandle}) - MyFursona`,
      default: "Profile layout"
    },
    description: `Follow @${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default function Layout({
  params,
  children
}: SlugRouteProps & { children: React.ReactNode }) {
  const profile = params.profile

  return (
    <>
      <DynamicMasthead handle={profile} />
      {/*
      
      Reimplmenting stuff

      <Masthead>
        <Masthead.Banner src="./avatar.png" />
        <Masthead.Info>
          <Profile>
            <Profile.Actions>
              <Button>Follow</Button>
              <Button>Report</Button>
              <Button>Block</Button>
            </Profile.Actions>
          </Profile>
        </Masthead.Info>
        <Masthead.Tabs>
          tab stuff
        </Masthead.Tabs>
      </Masthead>
      */}

      <div className="py-4">{children}</div>
    </>
  )
}
