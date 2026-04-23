import type { ReactHTMLElement } from "@mav/shared/types"

type PickedElementProps = Pick<ReactHTMLElement<"div">, "className">

interface PanelPaneProps extends PickedElementProps {
  /**
   * Specify if a pane is a navigation pane to apply its corresponding
   * layout from either mobile or desktop
   */
  isNavPane?: true
}

export function PanelPane(props: React.PropsWithChildren<PanelPaneProps>) {
  const PaneElement = props.isNavPane ? ("nav" as const) : ("div" as const)

  return (
    <PaneElement
      data-mav-navigation-pane={!props.isNavPane && undefined}
      data-mav-panel-pane=""
      {...props}
    >
      {props.children}
    </PaneElement>
  )
}
