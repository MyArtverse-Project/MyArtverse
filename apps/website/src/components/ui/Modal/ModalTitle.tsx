export default function ModalTitle({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="py-3 px-4 flex justify-between items-center gap-x-2">
      {children}
    </div>
  )
}
