export default function GroupContents({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="col-span-2 p-4 rounded-md border border-400">
      {children}
    </div>
  )
}
