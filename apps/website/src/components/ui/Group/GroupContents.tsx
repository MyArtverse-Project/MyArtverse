export default function GroupContents({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <div id="group-contents" className="col-span-2">
      <h3>{children}</h3>
    </div>
  )
}
