import { useValidateChildrenComponents } from "../../../hooks"
import { MastheadDetails } from "./Details"

/**
 * @internal Used for the main `<Masthead>` namespaced component
 */
export function MastheadWrapper(props: React.PropsWithChildren) {
  const mhWrapperChildren = useValidateChildrenComponents(props.children, [
    MastheadDetails,
  ])

  return (
    <div className="mx-auto flex max-w-screen-2xl gap-x-4 px-9">
      {mhWrapperChildren}
    </div>
  )
}
