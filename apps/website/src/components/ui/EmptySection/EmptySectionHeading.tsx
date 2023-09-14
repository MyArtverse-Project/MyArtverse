export default function EmptySectionHeading({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <h2 className="pt-3 pb-1.5 text-3xl not-prose font-inter font-bold">
      {children}
    </h2>
  )
}
