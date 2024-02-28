import type { Metadata, ResolvingMetadata } from "next"
import { cookies } from "next/headers"
import { Field, Group, MarginClamp } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import type { SlugRouteProps } from "@/types/utils"

export async function generateMetadata(
  { params }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const decodeUserHandle = params.profile

  return {
    title: `User`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default async function Page() {
  const fetchUserData = async (accessToken: string) => {
    console.log("fetching user data")
    const data = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/profile/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      credentials: "include"
    }).then((res) => res.json())
    return data
  }
  const cookieStore = cookies()
  console.log(cookieStore.getAll())
  const accessToken = cookieStore.getAll()[0].value // Access Token Value (Temporary)
  console.log(accessToken)
  const userData = await fetchUserData(accessToken)
  console.log(userData)
  return (
    <MarginClamp>
      <div className="flex w-full gap-3">
        <div className="w-1/2 flex-shrink-0"></div>
        <div className="w-1/2 flex-shrink-0">
          <Group>
            <Group.Header>About Username</Group.Header>
            <Group.HeaderButtons>
              <Button size="small">Edit</Button>
            </Group.HeaderButtons>
            <Group.Content>
              <Field title="Date joined" content="January 1, 2021" />
              <Field title="Birthday" content="January 1, 2021" />
              <Field title="Pronouns" content="He/Him" />
              <Field title="Nationality" content="Murica" />
            </Group.Content>
          </Group>
        </div>
      </div>
    </MarginClamp>
  )
}
