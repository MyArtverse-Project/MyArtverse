import { cn } from "@mav/shared/utils"

interface SkeletonProps {
  className: string
  clones: number
}

export function Skeleton(props: Partial<SkeletonProps>) {
  return (
    <>
      {Array.from(Array(props.clones ?? 1)).map((_, i) => (
        <div
          key={i}
          aria-hidden
          className={cn(
            "bg-skeleton flex-shrink-0 animate-pulse rounded-md",
            props.className
          )}
        />
      ))}
    </>
  )
}
