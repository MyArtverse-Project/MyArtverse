export default function SidebarSkeleton() {
  return (
    <div className="w-[290px] flex-shrink-0 px-6 pt-3.5">
      <div aria-hidden className="bg-300 h-14 w-full animate-pulse rounded-md" />
      <div aria-hidden className="bg-300 mb-3 mt-6 h-7 w-full animate-pulse rounded-md" />
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          aria-hidden
          className="bg-300 my-3 h-7 w-full animate-pulse rounded-md"
        />
      ))}
    </div>
  )
}
