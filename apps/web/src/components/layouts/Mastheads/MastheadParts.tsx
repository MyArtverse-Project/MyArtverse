import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export function MastheadBanner({ src }: { src?: string }) {
  if (src) {
    return (
      <div className="relative aspect-[15/3] w-full overflow-hidden">
        <Image
          src={src}
          alt="Profile banner"
          fill
          className="object-cover"
          priority
        />
      </div>
    )
  }

  return (
    <div className="from-primary/25 via-accent/20 to-primary/10 aspect-[15/3] max-h-52 w-full bg-gradient-to-r" />
  )
}

export function MastheadAvatar({
  src,
  alt,
  fallback,
  rounded = "full",
  onBanner = false
}: {
  src?: string
  alt: string
  fallback?: string
  rounded?: "full" | "xl"
  onBanner?: boolean
}) {
  return (
    <div
      className={cn(
        "relative size-32 flex-shrink-0 lg:size-44",
        onBanner ? "-mt-12" : "mt-2"
      )}
    >
      <Avatar
        className={cn(
          "border-background bg-muted size-32 border-4 shadow-md lg:size-44",
          rounded === "full" ? "rounded-full" : "rounded-xl"
        )}
      >
        {src && <AvatarImage src={src} alt={alt} className="object-cover" />}
        <AvatarFallback
          className={cn(
            "text-3xl font-semibold",
            rounded === "full" ? "rounded-full" : "rounded-xl"
          )}
        >
          {fallback ?? alt.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export function MastheadWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto flex max-w-screen-2xl items-end gap-x-4 px-9 pb-2">
      {children}
    </div>
  )
}

export function MastheadDetails({ children }: React.PropsWithChildren) {
  return (
    <section className="flex w-full flex-col gap-y-2.5 pb-2">{children}</section>
  )
}

export function MastheadLayer({
  children,
  spaceBetween
}: React.PropsWithChildren<{ spaceBetween?: boolean }>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1",
        spaceBetween && "justify-between"
      )}
    >
      {children}
    </div>
  )
}
