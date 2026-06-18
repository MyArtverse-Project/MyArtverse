import { User } from "@/app/context/AuthContext"
import Avatar from "@/components/Avatar"
import Notification from "@/components/Notification"
import Separator from "@/components/Separator"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import {
  generateCreateItems,
  generateSiteSettingItems
} from "@/utils/generateItems"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LuBell,
  LuCheck,
  LuChevronDown,
  LuMinusCircle,
  LuPlus
} from "react-icons/lu"
import { Dropdown, DropdownItem } from "./Dropdown"

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
          <Button
            variant="ghost"
            size="icon"
            className="w-auto px-2"
            aria-label="Site options"
          >
            {ICON}
          </Button>
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
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <div className="relative">
              <LuBell size={22} />
              {user.notifications.length > 0 &&
                !user.notifications.some((n) => n.read) && (
                  <span className="bg-primary absolute -top-1 -right-1 inline-block h-2 w-2 animate-pulse rounded-full" />
                )}
            </div>
          </Button>
        }
        items={
          <div className="flex flex-col items-center px-4 w-[500px]">
            <div className="flex flex-row items-center justify-between w-full">
              <span className="text-xl">Notifications</span>
              <div className="flex flex-row">
                <Button variant="ghost" size="icon" aria-label="Dismiss all">
                  <LuMinusCircle size={20} />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Mark all read">
                  <LuCheck size={20} />
                </Button>
              </div>
            </div>
            {user.notifications.length === 0 ? (
              <span className="text-muted-foreground text-sm">
                No new notifications
              </span>
            ) : (
              user.notifications
                .slice(0, 5)
                .map((notification) => (
                  <Notification
                    key={notification.id}
                    content={notification.content}
                    senderHandle={
                      notification.sender
                        ? notification.sender.handle
                        : undefined
                    }
                    createdAt={notification.createdAt}
                    read={notification.read}
                    userAvatar={user.avatarUrl || USER_DEFAULT_AVATAR}
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
              src={user.avatarUrl || USER_DEFAULT_AVATAR}
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
                  src={user.avatarUrl || USER_DEFAULT_AVATAR}
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
