import { useValidateChildrenComponents } from "../../../hooks"
import { MastheadDetails } from "./Details"

/**
 * @internal Used for the main `<Masthead>` namespaced component
 */
export function MastheadWrapper(props: React.PropsWithChildren) {
  const mhWrapperChildren = useValidateChildrenComponents(props.children, [
    // TODO: Using `@ts-expect-error` here is a temporary workaround until we can
    // @ts-expect-error
    MastheadDetails
  ])

  return (
    <div className="mx-auto flex max-w-screen-2xl items-center gap-x-4 my-3 px-9">
      {mhWrapperChildren}
    </div>
  )
}
