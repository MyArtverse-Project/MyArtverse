export default function Group({
  title,
  children
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <h2 className="not-prose font-inter block">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
