import type { IconType } from "react-icons"

export default function EmptySection({
  children,
  icon: Icon
}: {
  children?: React.ReactNode
  icon?: IconType
}) {
  return (
    <div className="grid px-4 py-32 text-center border rounded-md place-items-center border-error prose-p:w-2/3 prose-p:mx-auto prose-p:leading-6 prose-p:mt-2">
      <div className="p-4 rounded-lg bg-error-hl">
        <Icon size={48} strokeWidth={2} />
      </div>
      {children}
    </div>
  )
}
