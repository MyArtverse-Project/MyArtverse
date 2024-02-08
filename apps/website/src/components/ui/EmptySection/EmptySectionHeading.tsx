export default function EmptySectionHeading({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <h2 className="not-prose font-inter pb-1.5 pt-3 text-3xl font-bold">{children}</h2>
  )
}
