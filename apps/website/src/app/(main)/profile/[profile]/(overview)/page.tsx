import type { Metadata } from "next"
import { Field, Group, MarginClamp } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { fetchUser, fetchUserData } from "@/utils/api"
import type { SlugRouteProps } from "@/types/utils"

export async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
  const decodeUserHandle = params.profile

  return {
    title: `User`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default async function Page({ params }) {
  const userData = await fetchUser(params.profile)
  if (!userData) return null
  // TODO: Redirect to 404 instead of login when api route for user by handler is implemented
  return (
    <MarginClamp>
      <div className="flex w-full gap-3">
        <div className="w-1/2 flex-shrink-0"></div>
        <div className="w-1/2 flex-shrink-0">
          <Group>
            <Group.Header>
              About {userData.displayName ? userData.displayName : userData.handle}
            </Group.Header>
            <Group.HeaderButtons>
              <Button size="small">Edit</Button>
            </Group.HeaderButtons>
            <Group.Content>
              <Field
                title="Date joined"
                content={new Date(userData.dateRegistered).toDateString()}
              />
              {/* TODO: Custom attributes for Backend */}
              {/* <Field title="Birthday" content="January 1, 2021" /> */}
              {/* <Field title="Pronouns" content="He/Him" /> */}
              {/* <Field title="Nationality" content="Murica" /> */}
            </Group.Content>
          </Group>
        </div>
      </div>
    </MarginClamp>
  )
}
