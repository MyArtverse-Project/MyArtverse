import { cn } from "@mav/shared/utils"

interface SpinnerProps {
  size?: number
  className?: string
  label?: string
}

export function Spinner({ size = 20, className, label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <svg
        data-mav-spinner=""
        className={cn("animate-spin", className)}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}
