export default function GroupButtons({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center">
      <h3>{children}</h3>
    </div>
  )
}
