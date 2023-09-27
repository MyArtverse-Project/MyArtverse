import type { Metadata, ResolvingMetadata } from "next"
import { Group, Field } from "@/components/ui"
import type { SlugRouteProps } from "@/types"
import { Button } from "@/components/ui/Buttons"

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
    <div data-group-mode="visual" className="flex w-full gap-3">
      <div id="l-seperator" className="flex-shrink-0 w-1/2"></div>
      <div id="r-seperator" className="flex-shrink-0 w-1/2">
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
