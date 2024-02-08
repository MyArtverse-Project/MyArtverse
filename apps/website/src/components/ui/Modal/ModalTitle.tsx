export default function ModalTitle({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-x-2 px-4 py-3">{children}</div>
  )
}
