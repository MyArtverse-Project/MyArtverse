import type { IconType } from "react-icons"

export default function EmptySection({
  children,
  icon: Icon
}: {
  children?: React.ReactNode
  icon?: IconType
}) {
  return (
    <div className="border-error prose-p:w-2/3 prose-p:mx-auto prose-p:leading-6 prose-p:mt-2 grid place-items-center rounded-md border px-4 py-32 text-center">
      <div className="bg-error-hl rounded-lg p-4">
        <Icon size={48} strokeWidth={2} />
      </div>
      {children}
    </div>
  )
}
