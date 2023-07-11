import type { ChildrenNode } from "@/types"

interface MenuContainerProps extends ChildrenNode {
  heading?: string
}

export default function MenuContainer({
  heading,
  children
}: MenuContainerProps) {
  return (
    <div role="group">
      {heading && (
        <h2 className="px-4 py-1 font-semibold text-black uppercase text-[0.915rem]">
          {heading}
        </h2>
      )}
      {children}
    </div>
  )
}
