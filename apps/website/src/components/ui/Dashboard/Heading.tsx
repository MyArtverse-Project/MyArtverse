export default function Heading({
  title,
  buttons
}: {
  title: string
  buttons?: NonNullable<React.ReactElement>
}) {
  return (
    <div data-d-heading="" className="flex justify-between items-center">
      <span>{title}</span>
      <div>{buttons}</div>
    </div>
  )
}
