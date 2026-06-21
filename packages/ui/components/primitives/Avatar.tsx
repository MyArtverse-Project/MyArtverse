import { cn } from "@mav/shared/utils"
import { type VariantProps, cva } from "class-variance-authority"

const avatarVariants = cva(
  "bg-300 text-700 relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-semibold uppercase",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[0.6rem]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
        xl: "h-20 w-20 text-2xl"
      },
      ring: {
        true: "ring-2 ring-500 ring-offset-2 ring-offset-100",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      ring: false
    }
  }
)

interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  /** Fallback text (e.g. initials) shown when no image is provided */
  fallback?: string
}

export function Avatar({
  className,
  size,
  ring,
  src,
  alt = "",
  fallback,
  children,
  ...props
}: AvatarProps) {
  return (
    <span
      data-mav-avatar=""
      className={cn(avatarVariants({ size, ring }), className)}
      {...props}
    >
      {src ? (
        // biome-ignore lint/a11y/useAltText: alt is forwarded from props
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        (children ?? <span aria-hidden>{fallback?.slice(0, 2)}</span>)
      )}
    </span>
  )
}
