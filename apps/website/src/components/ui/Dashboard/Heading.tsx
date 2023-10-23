export default function Heading({
  title,
  buttons
}: {
  title: string
  buttons?: NonNullable<React.ReactElement>
}) {
  return (
    <div className="flex justify-between items-center">
      <span>{title}</span>
      <div>{buttons}</div>
    </div>
  )
}
