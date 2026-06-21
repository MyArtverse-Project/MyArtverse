import { SidebarSettingsList } from "@/components/layouts/AppLayout/Sidebar/SidebarSettingsList"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: `%s - Settings - ${BRAND}`,
    default: ""
  }
}

export default async function SettingsLayout(
  props: Readonly<React.PropsWithChildren>
) {
  return (
    <div className="mx-auto mb-20 max-w-[1400px] px-4">
      <div className="flex gap-x-6">
        <SidebarSettingsList />
        <div className="flex-1 px-0.5 pt-1">{props.children}</div>
      </div>
    </div>
  )
}
