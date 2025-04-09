import { Button } from "@mav/ui/components/buttons"
import { NotificationItem } from "./NotificationItem"
import type { User } from "@/app/context/AuthContext"
import { LuCheck, LuMinusCircle } from "react-icons/lu"

interface NotificationWindowProps {
  user: User
}

export function NotificationWindow({ user }: NotificationWindowProps) {
  const { notifications } = user

  const hasReadNotifications = notifications.length === 0

  return (
    <div className="flex flex-col items-center px-4 w-[500px]">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-xl">Notifications</span>
        <div className="flex flex-row">
          <Button variant="tritery" icon={<LuMinusCircle size={20} />} />
          <Button variant="tritery" icon={<LuCheck size={20} />} />
        </div>
      </div>
      {hasReadNotifications ? (
        <span className="text-500 text-sm">No new notifications</span>
      ) : (
        notifications
          .slice(0, 5)
          .map((notifItem) => (
            <NotificationItem
              key={notifItem.id}
              content={notifItem.content}
              senderHandle={
                notifItem.sender ? notifItem.sender.handle : undefined
              }
              createdAt={notifItem.createdAt}
              hasRead={notifItem.read}
              userAvatar={user.avatarUrl || "/UserProfile.png"}
              senderAvatar={
                notifItem.sender ? notifItem.sender.avatarUrl : null
              }
              comment={notifItem.comment}
              artwork={notifItem.artwork}
              character={notifItem.character}
              url={
                notifItem.artwork
                  ? `/artworks/${notifItem.artwork.id}`
                  : notifItem.character
                    ? `/characters/${notifItem.character.id}`
                    : null
              }
            />
          ))
      )}
    </div>
  )
}
