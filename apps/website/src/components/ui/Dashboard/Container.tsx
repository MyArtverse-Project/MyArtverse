import clsx from "clsx"
import { Button } from "../Buttons"

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
      <aside
        className={clsx(
          "sticky top-0 flex items-center justify-between px-8 py-4",
          !headingTransparent ? "bg-200 bg-opacity-75" : ""
        )}
      >
        <span className="font-inter text-2xl font-bold">{heading}</span>
        <div className="flex items-center gap-x-1">{actions}</div>
      </aside>
      <main className={!noChildrenPadding ? "px-8 py-3.5" : null}>{children}</main>
    </div>
  )
}
