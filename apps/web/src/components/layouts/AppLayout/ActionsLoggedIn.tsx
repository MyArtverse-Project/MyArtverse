import { User } from "@/app/context/AuthContext"
import { Avatar, Separator } from "@/components"
import { NotificationWindow } from "@/components/Notifications"
import {
  generateCreateItems,
  generateSiteSettingItems
} from "@/utils/generateItems"
import { Button } from "@mav/ui/components/buttons"
import Link from "next/link"
import { LuBell, LuChevronDown, LuPlus } from "react-icons/lu"
import { Dropdown, DropdownItem } from "./Dropdown"

const ICONS = (
  <>
    <LuPlus size={20} />
    <LuChevronDown size={20} />
  </>
)

export function ActionsLoggedIn({
  user,
  isRegistered
}: {
  user: User | null
  isRegistered: boolean
}) {
  if (!user) return null
  const createNewItems = generateCreateItems()
  const siteSettingsItems = generateSiteSettingItems(
    isRegistered,
    user ? user.handle : null
  )

  return (
    <div className="flex flex-row items-center gap-x-2">
      <Separator dir="vertical" size={28} />
      <Dropdown
        button={
          <Button icon={ICONS} aria-label="Site options" variant="tritery" />
        }
        items={
          <>
            {createNewItems.map((item, index) =>
              item.name != undefined ? (
                <DropdownItem
                  key={index}
                  link={item.link}
                  prefixIcon={<item.icon size={22} />}
                  aria-label={item.name}
                >
                  {item.name}
                </DropdownItem>
              ) : (
                <div className="my-2" key={index}>
                  <Separator dir="horizontal" />
                </div>
              )
            )}
          </>
        }
      />
      <Dropdown
        button={
          <Button
            prefix={
              <div className="relative">
                <LuBell size={22} />
                {user.notifications.length > 0 &&
                  !user.notifications.some((n) => n.read) && (
                    <span className="absolute -top-1 -right-1 inline-block w-2 h-2 bg-500 rounded-full animate-pulse" />
                  )}
              </div>
            }
            variant="tritery"
          />
        }
        items={<NotificationWindow user={user} />}
      />

      <Dropdown
        button={
          <Link href={`/@${user.handle}`}>
            <Avatar
              username={user.handle}
              size={32}
              src={user.avatarUrl || "/UserProfile.png"}
            />
          </Link>
        }
        items={
          <>
            <DropdownItem link={`/@${user.handle}`} aria-label={user.handle}>
              <div className="flex flex-row items-center space-x-5 pr-24">
                <Avatar
                  username={user.handle}
                  size={74}
                  src={user.avatarUrl || "/UserProfile.png"}
                />
                <div className="flex flex-col">
                  {/* TODO: Display Badges */}
                  <span className="text-xl font-bold">
                    {user.displayName || user.handle}{" "}
                  </span>
                  <span>@{user.handle}</span>
                </div>
              </div>
            </DropdownItem>
            <div className="my-2">
              <Separator dir="horizontal" />
            </div>
            {siteSettingsItems.map((item, index) =>
              item.name != undefined ? (
                <DropdownItem
                  key={index}
                  link={item.link}
                  prefixIcon={<item.icon size={22} />}
                  component={item.component}
                  special={item.special}
                >
                  {item.name}
                </DropdownItem>
              ) : (
                <div className="my-2" key={index}>
                  <Separator dir="horizontal" />
                </div>
              )
            )}
          </>
        }
      />
    </div>
  )
}
