import { useValidateChildrenComponents } from "../../../hooks"
import { PanelPane } from "./PanelPane"

export function PanelContainer(props: React.PropsWithChildren) {
  const paneChildrenOnly = useValidateChildrenComponents(props.children, [
    PanelPane,
  ])

  return <div className="flex">{paneChildrenOnly}</div>
}
