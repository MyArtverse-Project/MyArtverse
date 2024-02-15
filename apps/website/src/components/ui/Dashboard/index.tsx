import DashboardContainer from "./Container"
import * as GroupRoot from "./Group"
import GroupNested from "./GroupNested"
import Heading from "./Heading"
import DashboardNavbar from "./Navbar"
import DashboardSidebar from "./Sidebar"

const Group = Object.assign(GroupRoot, { Nested: GroupNested })

export {
  Heading,
  DashboardNavbar,
  DashboardSidebar,
  Group,
  DashboardContainer as Container
}
