import type { IconType } from "react-icons"

interface EmptySectionProps {
  icon: IconType
  image: string
}

export default function EmptySection(
  props: Partial<React.PropsWithChildren<EmptySectionProps>>,
) {
  const { icon: Icon } = props

  if (props.icon && props.image) {
    throw new Error("You can't use both `icon` and `image` props!")
  }

  return (
    <div className="border-alert prose-p:w-2/3 prose-p:mx-auto prose-p:leading-6 prose-p:mt-2 grid place-items-center rounded-md border px-4 py-32 text-center">
      <div className="bg-alert-hl rounded-lg p-4">
        {props.icon && <Icon size={48} strokeWidth={2} />}
      </div>
      {props.children}
    </div>
  )
}
