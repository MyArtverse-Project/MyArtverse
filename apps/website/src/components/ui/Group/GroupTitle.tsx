export default function GroupTitle({
  prefixIcon,
  children
}: {
  prefixIcon?: NonNullable<React.ReactElement>
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center">
      <div>{prefixIcon}</div>
      <h3 className="not-prose font-inter text-2xl font-bold">{children}</h3>
    </div>
  )
}
