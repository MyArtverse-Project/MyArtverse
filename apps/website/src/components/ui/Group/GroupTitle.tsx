export default function GroupTitle({
  prefix,
  children
}: {
  prefix?: NonNullable<React.ReactElement>
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center">
      <div>{prefix}</div>
      <h3 className="not-prose font-bold font-inter text-2xl">{children}</h3>
    </div>
  )
}
