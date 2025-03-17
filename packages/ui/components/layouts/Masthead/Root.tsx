"use client"

import { useValidateChildrenComponents } from "../../../hooks"
import { MastheadBanner } from "./Banner"
import { MastheadTabs } from "./Tabs"
import { MastheadWrapper } from "./Wrapper"

interface MastheadRootProps {
  hasEditAccess?: boolean
}

type MakePropsOptional<P> = React.FC<Partial<P>>

/**
 * @internal Used for the main `<Masthead>` namespaced component
 */
export function MastheadRoot(
  props: React.PropsWithChildren<MastheadRootProps>,
) {
    // TODO: Using `@ts-expect-error` here is a temporary workaround until we can

  const validMastheadChildrens = useValidateChildrenComponents(props.children, [
    // @ts-expect-error
    MastheadBanner,
    // @ts-expect-error
    MastheadTabs as MakePropsOptional<typeof MastheadTabs>,
    // @ts-expect-error
    MastheadWrapper,
  ])

  return (
    <div data-mh-root="" className="contents">
      {validMastheadChildrens}
    </div>
  )
}
