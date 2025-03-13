"use client"

import { cn } from "@mav/shared/utils"

type PickedDivProps = Pick<HTMLDivElement, "className">

interface MastheadLayerProps extends PickedDivProps {
  spaceBetween: boolean
}

/**
 * @internal For internal use only on field-related components, do not import directly!
 */
export function MastheadLayer(props: Partial<React.PropsWithChildren<MastheadLayerProps>>) {
  return (
    <div data-mh-layer="" className={cn(props.spaceBetween && "justify-between")}>
      {props.children}
    </div>
  )
}
