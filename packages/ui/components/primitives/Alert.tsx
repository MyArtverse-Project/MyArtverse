import { cn } from "@mav/shared/utils"
import { type VariantProps, cva } from "class-variance-authority"
import type { IconType } from "react-icons"

const alertVariants = cva(
  "relative flex w-full gap-x-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "border-400 bg-200",
        info: "border-info/40 bg-info-hl",
        success: "border-success/40 bg-success-hl",
        warning: "border-warning/40 bg-warning-hl",
        alert: "border-alert/40 bg-alert-hl"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const iconColors: Record<NonNullable<AlertProps["variant"]>, string> = {
  default: "text-500",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  alert: "text-alert"
}

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: IconType
}

export function Alert({
  className,
  variant,
  icon: Icon,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-mav-alert=""
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {Icon && (
        <Icon
          aria-hidden
          size={18}
          className={cn(
            "mt-0.5 flex-shrink-0",
            iconColors[variant ?? "default"]
          )}
        />
      )}
      <div className="flex flex-col gap-y-1">{children}</div>
    </div>
  )
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      data-mav-alert-title=""
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-mav-alert-description=""
      className={cn("text-sm opacity-80 [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}
