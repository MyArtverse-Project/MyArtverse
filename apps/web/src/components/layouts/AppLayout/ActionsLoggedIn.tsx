import Link from "next/link"
import { User } from "@/app/context/AuthContext"
import Avatar from "@/components/Avatar"
import Separator from "@/components/Separator"
import {
  generateCreateItems,
  generateSiteSettingItems
} from "@/utils/generateItems"
import { Button } from "@mav/ui/components/buttons"
import { LuBell, LuCheck, LuChevronDown, LuMinusCircle, LuPlus } from "react-icons/lu"
import { Dropdown, DropdownItem } from "./Dropdown"
import Notification from "@/components/Notification"

const ICON = (
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
          <Button icon={ICON} aria-label="Site options" variant="tritery" />
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
        button={<Button
          prefix={<div className="relative">
            <LuBell size={22} />
            {user.notifications.length > 0 && !user.notifications.some(n => n.read) && (
              <span className="absolute -top-1 -right-1 inline-block w-2 h-2 bg-500 rounded-full animate-pulse" />
            )}
          </div>}
          variant="tritery"
        />}
        items={
          <div className="flex flex-col items-center px-4 w-[500px]">
            <div className="flex flex-row items-center justify-between w-full">
              <span className="text-xl">Notifications</span>
              <div className="flex flex-row">
                <Button variant="tritery"  icon={<LuMinusCircle size={20} />} />
                <Button variant="tritery" icon={<LuCheck size={20} />} />
              </div>
            </div>
            {user.notifications.length === 0 ? (
              <span className="text-500 text-sm">No new notifications</span>
            ) : (
              user.notifications.slice(0, 5).map((notification) => (
                <Notification
                  key={notification.id}
                  content={notification.content}
                  senderHandle={notification.sender ? notification.sender.handle : undefined}
                  createdAt={notification.createdAt}
                  read={notification.read}
                  userAvatar={user.avatarUrl || "/UserProfile.png"}
                  senderAvatar={
                    notification.sender ? notification.sender.avatarUrl : null
                  }
                  comment={notification.comment}
                  artwork={notification.artwork}
                  character={notification.character}
                  url={
                    notification.artwork
                      ? `/artworks/${notification.artwork.id}`
                      : notification.character
                        ? `/characters/${notification.character.id}`
                        : null
                  }
                />
              ))
            )}

          </div>
        }

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
