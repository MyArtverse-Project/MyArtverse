import { cn } from "@mav/shared/utils"

export function Kbd({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      data-mav-kbd=""
      className={cn(
        "border-400 bg-200 text-subtext inline-flex h-5 min-w-[1.25rem] select-none items-center justify-center rounded border px-1.5 font-inter text-[0.7rem] font-semibold",
        className
      )}
      {...props}
    />
  )
}
