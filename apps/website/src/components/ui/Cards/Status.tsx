import { type LucideIcon, LockIcon, SparklesIcon, StarIcon } from "lucide-react"
import type { FursonaStatus } from "@/types/Fursonas"

export default function Status({ status }: { status: FursonaStatus }) {
  const base = "flex flex-row items-center text-md font-semibold my-1"

  const statusObj: Record<
    FursonaStatus,
    { label: string; className: string; icon: LucideIcon }
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
    <span className={[StatusClassName, base].join(" ")}>
      {StatusIcon ? <StatusIcon size={19} className="mr-2" /> : null}
      {StatusLabel ? StatusLabel : null}
    </span>
  )
}