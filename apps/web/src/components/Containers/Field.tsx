import { cn } from "@mav/shared/utils"

interface FieldProps {
  title?: string
  content?: string
  // custom?: boolean
  full?: boolean
}

export function Field({
  title,
  content,
  // custom,
  full
}: FieldProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-y-1 px-2 py-1.5",
        !full ? "w-1/2" : "w-full"
      )}
    >
      <div>
        <span className="font-inter text-[0.8rem] font-bold uppercase opacity-50">
          {title}
        </span>
      </div>
      <div>{content}</div>
    </div>
  )
}
