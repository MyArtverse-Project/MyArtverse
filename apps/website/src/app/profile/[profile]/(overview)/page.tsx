import type { Metadata, ResolvingMetadata } from "next"
import { Field, Group } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import type { SlugRouteProps } from "@/types"

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

export default function Page() {
  return (
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
  )
}
