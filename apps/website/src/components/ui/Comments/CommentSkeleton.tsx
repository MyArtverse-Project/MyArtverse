export default function CommentSkeleton() {
  return (
    <div className="flex items-start gap-x-4">
      <div className="flex-shrink-0">
        <div aria-hidden className="bg-300 size-[40px] animate-pulse rounded-full" />
      </div>
      <div className="flex w-full flex-col gap-y-1">
        <div aria-hidden className="bg-300 h-5 w-32 animate-pulse rounded-sm" />
        <div aria-hidden className="bg-300 h-3 w-1/3 animate-pulse rounded-sm" />
      </div>
    </div>
  )
}
