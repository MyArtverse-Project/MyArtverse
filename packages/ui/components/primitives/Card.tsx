import { cn } from "@mav/shared/utils"
import { type VariantProps, cva } from "class-variance-authority"

const cardVariants = cva("rounded-xl text-700 transition-colors", {
  variants: {
    variant: {
      default: "bg-100 border border-400",
      elevated: "bg-100 border border-400 shadow-lg shadow-black/5",
      outline: "bg-transparent border-2 border-300",
      ghost: "bg-200/60 border border-transparent"
    },
    interactive: {
      true: "hover:border-500 hover:bg-200/40 cursor-pointer",
      false: ""
    }
  },
  defaultVariants: {
    variant: "default",
    interactive: false
  }
})

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, interactive, ...props }: CardProps) {
  return (
    <div
      data-mav-card=""
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-mav-card-header=""
      className={cn("flex flex-col gap-y-1.5 p-5", className)}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-mav-card-title=""
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-mav-card-description=""
      className={cn("text-subtext text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-mav-card-content=""
      className={cn("p-5 pt-0", className)}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-mav-card-footer=""
      className={cn("flex items-center gap-x-2 p-5 pt-0", className)}
      {...props}
    />
  )
}
