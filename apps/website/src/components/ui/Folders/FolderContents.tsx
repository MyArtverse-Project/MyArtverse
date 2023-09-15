export default function FolderContents({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="w-full grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
    >
      {children}
    </div>
  )
}
