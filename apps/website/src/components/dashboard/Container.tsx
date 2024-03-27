import cn from "@/utils/cn"

export default function DashboardContainer({
  children,
  heading,
  actions,
  headingTransparent,
  noChildrenPadding
}: Readonly<{
  children: React.ReactNode
  heading?: string
  actions?: NonNullable<React.ReactElement>
  headingTransparent?: boolean
  noChildrenPadding?: boolean
}>) {
  return (
    <div data-dashboard-container="" className="relative">
      <section
        className={cn(
          "sticky top-0 flex h-[4rem] items-center justify-between px-6 pb-2.5 pt-4",
          !headingTransparent ? "bg-200 bg-opacity-75" : ""
        )}
      >
        <span className="font-inter text-2xl font-bold">{heading}</span>
        {actions ? <div className="flex items-center gap-x-1">{actions}</div> : null}
      </section>
      <div className={!noChildrenPadding ? "px-6 py-3.5" : null}>{children}</div>
    </div>
  )
}
