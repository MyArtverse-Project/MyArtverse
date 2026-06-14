import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LuShield } from "react-icons/lu"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-5 p-24">
      <h2 className="text-xl font-semibold">Badges</h2>
      <div className="flex items-center gap-x-2">
        <Badge>Default</Badge>
        <Badge>
          <LuShield className="mr-1 size-3" />
          With icon
        </Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="outline">
          <LuShield className="mr-1 size-3" />
          With icon
        </Badge>
      </div>
      <h2 className="text-xl font-semibold">Buttons</h2>
      <div className="flex items-center gap-x-2">
        <Button size="sm">Small</Button>
        <Button size="sm">
          <LuShield size={16} />
          With icon
        </Button>
        <Button variant="secondary">
          <LuShield size={16} />
          With icon + Badge
          <Badge variant="secondary">123</Badge>
        </Button>
        <Button size="lg">Big</Button>
        <Button variant="secondary" size="sm">
          Small Secondary
        </Button>
        <Button variant="ghost" size="sm">
          Small Ghost
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
        <Button variant="ghost" disabled>
          Disabled Ghost
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="link">Link</Button>
      </div>
    </main>
  )
}
