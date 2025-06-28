import type { CharacterStatus } from "@/types/characters"
import { cn } from "@mav/shared/utils"
import type { IconType } from "react-icons"
import {
  LuLock as LockIcon,
  LuSparkles as SparklesIcon,
  LuStar as StarIcon
} from "react-icons/lu"

interface CharacterStatusProps {
  status: CharacterStatus
}

export default function Status({ status }: CharacterStatusProps) {
  const base = "flex flex-row items-center text-md font-semibold my-1"

  const statusObj: Record<
    CharacterStatus,
    { label: string; className: string; icon: IconType }
  > = {
    adopted: {
      label: "Adopted",
      className: "text-500",
      icon: SparklesIcon
    },
    upForAdopt: {
      label: "Up for adoption",
      className: "text-500",
      icon: SparklesIcon
    },
    main: {
      label: "Main character",
      className: "text-500",
      icon: StarIcon
    },
    hidden: {
      label: "Only visible to you",
      className: "text-subtext",
      icon: LockIcon
    },
    owned: {
      label: null,
      className: null,
      icon: null
    }
  }

  const StatusIcon = statusObj[status].icon
  const StatusLabel = statusObj[status].label
  const StatusClassName = statusObj[status].className

  const isOwnedLabel = !StatusIcon && !StatusLabel && !StatusClassName

  return isOwnedLabel ? null : (
    <span className={cn(StatusClassName, base)}>
      {StatusIcon ? <StatusIcon size={19} className="mr-2" /> : null}
      {StatusLabel ? StatusLabel : null}
    </span>
  )
}
