export default function Heading({
  title,
  buttons
}: {
  title: string
  buttons?: NonNullable<React.ReactElement>
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{title}</span>
      <div>{buttons}</div>
    </div>
  )
}
