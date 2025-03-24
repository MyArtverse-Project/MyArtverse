"use client"

import { useValidateChildrenComponents } from "../../../hooks"
import { MastheadAvatar } from "./Avatar"
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
  props: React.PropsWithChildren<MastheadRootProps>
) {
  // TODO: Using `@ts-expect-error` here is a temporary workaround until we can

  const validMastheadChildrens = useValidateChildrenComponents(props.children, [
    MastheadBanner,
    MastheadTabs as MakePropsOptional<typeof MastheadTabs>,
    MastheadWrapper,
    MastheadAvatar
  ])

  return (
    <div data-mh-root="" className="contents">
      {validMastheadChildrens}
    </div>
  )
}
