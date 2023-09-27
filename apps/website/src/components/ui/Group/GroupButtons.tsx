export default function GroupButtons({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div id="group-buttons-wrapper" className="flex items-center">
      {children}
    </div>
  )
}
