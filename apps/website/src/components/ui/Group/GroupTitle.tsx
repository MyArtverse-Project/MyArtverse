export default function GroupTitle({
  prefix,
  children
}: {
  prefix: NonNullable<React.ReactElement>
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center">
      <div>{prefix}</div>
      <h3>{children}</h3>
    </div>
  )
}
