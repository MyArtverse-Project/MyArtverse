import { PanelContainer } from "./PanelContainer"
import { PanelPane } from "./PanelPane"

const Panel = Object.assign(PanelContainer, {
  Pane: PanelPane
})

export { Panel }
