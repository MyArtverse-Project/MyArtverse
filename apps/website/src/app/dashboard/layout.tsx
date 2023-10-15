export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div
        style={{ width: 250 }}
        className="sticky top-16 [align-self:flex-start] h-[calc(100dvh-4rem)] border-r border-r-separator"
      >
        sidebar items
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
