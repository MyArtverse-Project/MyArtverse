"use client"

import Avatar from "@/components/Avatar"
import type { ScrollTitleData } from "@/components/layouts/AppLayout/ScrollTitleContext"
import { cn } from "@/lib/utils"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import Link from "next/link"
import { LuChevronRight, LuUser } from "react-icons/lu"

export function NavbarScrollTitle({
  data,
  visible
}: {
  data: ScrollTitleData
  visible: boolean
}) {
  if (data.kind === "character") {
    return (
      <div
        className={cn(
          "absolute left-0 flex min-w-0 items-center transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        )}
        aria-hidden={!visible}
      >
        <div
          className={cn(
            "border-border/25 bg-muted/20 inline-flex max-w-[min(52vw,24rem)] items-center gap-1.5 rounded-full border py-1.5 pl-2 pr-5",
            "shadow-sm ring-1 ring-inset ring-white/[0.06]"
          )}
        >
          <Link
            href={data.href}
            aria-label={data.label}
            className="hover:bg-muted/50 inline-flex min-w-0 items-center gap-2 rounded-full px-2 py-0.5 transition-colors"
          >
            <Avatar
              src={data.avatarUrl || USER_DEFAULT_AVATAR}
              username={data.primary}
              size={24}
              className="rounded-lg"
            />
            <span className="text-foreground truncate text-sm font-semibold">
              {data.primary}
            </span>
          </Link>
          {data.secondary && (
            <>
              <LuChevronRight
                size={12}
                className="text-muted-foreground/50 shrink-0"
                aria-hidden
              />
              <Link
                href={data.ownerHref ?? "#"}
                aria-label={`Owner @${data.secondary}`}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50 inline-flex min-w-0 items-center gap-1.5 rounded-full px-2 py-0.5 transition-colors"
              >
                <Avatar
                  src={data.ownerAvatarUrl || USER_DEFAULT_AVATAR}
                  username={data.secondary}
                  size={18}
                />
                <span className="truncate text-xs">@{data.secondary}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "absolute left-0 flex min-w-0 items-center transition-all duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-1 opacity-0"
      )}
      aria-hidden={!visible}
    >
      <Link
        href={data.href}
        aria-label={data.label}
        className={cn(
          "border-border/25 bg-muted/20 text-foreground/90 inline-flex max-w-[min(52vw,20rem)] items-center gap-2.5 rounded-full border py-1.5 pl-2 pr-6 text-sm font-medium",
          "shadow-sm ring-1 ring-inset ring-white/[0.06]",
          "transition-all duration-200 hover:border-primary/30 hover:bg-muted/50 hover:shadow-md hover:ring-primary/10"
        )}
      >
        <Avatar
          src={data.avatarUrl || USER_DEFAULT_AVATAR}
          username={data.primary}
          size={24}
        />
        <LuUser size={14} className="text-primary shrink-0" aria-hidden />
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate font-semibold">{data.primary}</span>
          {data.secondary && (
            <span className="text-muted-foreground truncate text-xs font-normal">
              {data.secondary}
            </span>
          )}
        </span>
      </Link>
    </div>
  )
}
