import { cn } from "@/lib/utils"

export default function CommentContent({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  return (
    <p className={cn("text-sm leading-relaxed whitespace-pre-wrap break-words", className)}>
      {content}
    </p>
  )
}
