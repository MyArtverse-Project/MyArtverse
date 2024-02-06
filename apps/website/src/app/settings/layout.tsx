import { Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { kebabCase } from "lodash"
import type { IconType } from "react-icons"
import {
  LuAccessibility,
  LuActivity,
  LuAlertOctagon,
  LuBell,
  LuCode,
  LuCreditCard,
  LuFileText,
  LuLock,
  LuPalette,
  LuSettings2,
  LuUser,
  LuWrench
} from "react-icons/lu"

interface SettingContents {
  icon: IconType
  text: string
  slug?: string
}

const SETTING_NAV: { heading: string; list: SettingContents[] }[] = [
  {
    heading: "General",
    list: [
      { icon: LuUser, text: "Profile" },
      { icon: LuSettings2, text: "My account", slug: "account" }
    ]
  },
  {
    heading: "Billing",
    list: [
      { icon: LuCreditCard, text: "Payment methods" },
      { icon: LuFileText, text: "Invoices" }
    ]
  },
  {
    heading: "Access",
    list: [
      { icon: LuPalette, text: "Appearance" },
      { icon: LuActivity, text: "Activity" },
      { icon: LuAlertOctagon, text: "Moderation" },
      { icon: LuAccessibility, text: "Accessibility" },
      { icon: LuBell, text: "Notifications" },
      { icon: LuLock, text: "Privacy" }
    ]
  },
  {
    heading: "Developers",
    list: [
      { icon: LuCode, text: "API Keys" },
      { icon: LuWrench, text: "Integrations" }
    ]
  }
]

const SettingList = ({ items }: { items?: SettingContents[] }) => {
  return items.map((item, index) => (
    <Button
      key={index}
      variant="tritery"
      prefixIcon={<item.icon size={19} />}
      href={!item.slug ? `/settings/${kebabCase(item.text)}` : `/settings/${kebabCase(item.slug)}`}
    >
      {item.text}
    </Button>
  ))
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex gap-x-10 mt-8 mx-auto max-w-screen-2xl px-8">
      <nav className="flex-shrink-0 w-72 flex flex-col pb-5">
        {SETTING_NAV.map(({ heading, list }, index) => (
          <div role="group" tabIndex={0} aria-labelledby={kebabCase(heading)} key={index}>
            {index !== 0 ? <Separator dir="horizontal" padding={10} /> : null}
            <h2 id={kebabCase(heading)} className="text-sm uppercase mt-3.5  mb-1.5 ml-4 text-600">
              {heading}
            </h2>
            <SettingList items={list} />
          </div>
        ))}
      </nav>
      <div className="w-full">{children}</div>
    </main>
  )
}
