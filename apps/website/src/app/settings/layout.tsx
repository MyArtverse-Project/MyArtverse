import { Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

import { LuActivity } from "react-icons/lu"

function SettingList({ items }: { items?: string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <Button
          key={index}
          variant="tritery"
          prefixIcon={<LuActivity size={19} />}
          href="/settings/"
        >
          {item}
        </Button>
      ))}
    </>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex gap-x-3 mt-8 mx-auto max-w-screen-2xl px-8">
      <div className="flex-shrink-0 w-72 flex flex-col pb-5">
        <h2 className="text-base my-1.5 ml-4">Account</h2>
        <SettingList
          items={[
            "Profile",
            "Appearance",
            "Accessibility",
            "Activity",
            "Notifications",
            "Billing & subscriptions"
          ]}
        />
        <Separator dir="horizontal" padding={10} />
        <h2 className="text-base my-1.5 ml-4">Listings/Automation</h2>
        <SettingList items={["Default settings", "Events"]} />
        <Separator dir="horizontal" padding={10} />
        <h2 className="text-base my-1.5 ml-4">Billing & subscriptions</h2>
        <SettingList items={["Payment info", "Usage"]} />
        <Separator dir="horizontal" padding={10} />
        <h2 className="text-base my-1.5 ml-4">Security</h2>
        <SettingList
          items={[
            "Privacy and data consent",
            "Authentication",
            "Connected accounts",
            "Sessions"
          ]}
        />
        <Separator dir="horizontal" padding={10} />
        <h2 className="text-base my-1.5 ml-4">Developers</h2>
        <SettingList items={["API Keys", "Integrations", "Event Logs"]} />
      </div>
      <div className="w-full">{children}</div>
    </main>
  )
}
