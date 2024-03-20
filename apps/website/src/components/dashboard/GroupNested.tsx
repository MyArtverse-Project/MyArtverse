export default function GroupNested({
  title,
  children
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <h3 className="not-prose block">{title}</h3>
      <div>{children}</div>
    </div>
  )
}
