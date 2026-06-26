import { cn } from "@/lib/utils"
import React from "react"

type CommentBaseVariant = "composer" | "message"

interface CommentBaseProps {
  imgTag: React.ReactNode
  avatar: string
  outerContainer?: React.ReactNode
  isNested?: boolean
  variant?: CommentBaseVariant
  alignAvatar?: "start" | "center"
  composerExpanded?: boolean
  className?: string
  bubbleClassName?: string
}

const bubbleSurface = {
  message: "bg-muted/30",
  composer: "bg-muted/35",
} as const

/** @internal Shared comment layout primitive */
export default function CommentBase({
  children,
  imgTag,
  outerContainer,
  isNested,
  variant = "message",
  alignAvatar = "start",
  composerExpanded = true,
  className,
  bubbleClassName,
}: React.PropsWithChildren<CommentBaseProps>) {
  const isComposer = variant === "composer"
  const surface = bubbleSurface[variant]
  const showComposerTail = isComposer && composerExpanded

  return (
    <div
      className={cn(
        "flex gap-3",
        alignAvatar === "center" ? "items-center" : "items-start",
        isNested && "ml-11 mt-3",
        className
      )}
    >
      <span
        className={cn(
          "shrink-0",
          alignAvatar === "start" && "mt-0.5"
        )}
      >
        {imgTag}
      </span>

      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "group/bubble relative",
            isComposer &&
              composerExpanded &&
              "rounded-2xl focus-within:ring-2 focus-within:ring-primary/20"
          )}
        >
          {showComposerTail ? (
            <span
              className={cn(
                "absolute z-10 block size-2.5 rotate-45",
                surface,
                "-left-[5px] top-1/2 -translate-y-1/2"
              )}
              aria-hidden
            />
          ) : !isComposer ? (
            <span
              className={cn(
                "absolute z-10 block size-2.5 rotate-45",
                surface,
                "-left-[5px] top-5"
              )}
              aria-hidden
            />
          ) : null}
          <div
            className={cn(
              "overflow-hidden transition-colors",
              isComposer && !composerExpanded
                ? "bg-muted/15 hover:bg-muted/25 rounded-full"
                : cn(surface, isComposer ? "rounded-2xl" : "rounded-xl"),
              bubbleClassName
            )}
          >
            {children}
          </div>
        </div>
        {outerContainer}
      </div>
    </div>
  )
}
