import { Button } from "@/components/ui/button"
import { Group, MarginGutter } from "@/components/ui/group"
import { LuMessageCircle, LuMoreVertical } from "react-icons/lu"

export default function StudioOverviewPage() {
  return (
    <MarginGutter
      screenSize="xl"
      className="px-6 py-5 *:mt-6 *:gap-6 first:*:mt-0"
    >
      <div className="grid">
        <Group
          title="Recent messages"
          potentialActions={
            <div className="flex items-center gap-x-2">
              <Button variant="outline">See all messages</Button>
              <Button>
                <LuMessageCircle size={20} />
                Compose
              </Button>
            </div>
          }
        >
          slot placeholder
        </Group>
        <Group
          title="Quick access"
          description="Lorem ipsum stuff"
          potentialActions={
            <Button variant="ghost" size="icon">
              <LuMoreVertical size={21} />
            </Button>
          }
        >
          slot placeholder
        </Group>
      </div>
      <div className="grid grid-cols-2">
        <Group title="Commission status" containerStyle="border-padding">
          slot placeholder
        </Group>
        <Group title="Analytics" containerStyle="border-padding">
          slot placeholder
        </Group>
      </div>
    </MarginGutter>
  )
}
