import { Metadata, ResolvingMetadata } from "next"

import ProfileMasthead from "./ProfileMasthead"

type Props = {
  params: {
    profile: string
  }
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // !! NOTE: For testing only, actual user data is going to be fetched through the API
  const decodeUserHandle = `${params.profile}`
  return {
    title: {
      template: `%s (@${decodeUserHandle}) - MyFursona`,
      default: "lol"
    },
    description: `Follow @${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default function Layout({ params, children }: Props) {
  const profile = params.profile

  return (
    <>
      <ProfileMasthead handle={profile} />
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
      <main id="content-gutter" className="px-12 mx-auto max-w-screen-2xl">
        <div className="py-4">{children}</div>
      </main>
    </>
  )
}
