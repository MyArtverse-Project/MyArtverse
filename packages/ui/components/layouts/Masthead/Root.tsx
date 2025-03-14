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
  const validMastheadChildrens = useValidateChildrenComponents(props.children, [
    MastheadBanner,
    MastheadTabs as MakePropsOptional<typeof MastheadTabs>,
    MastheadWrapper,
  ])

  return (
    <div data-mh-root="" className="contents">
      {validMastheadChildrens}
    </div>
  )
}
