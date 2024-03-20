import DashboardContainer from "./Container"
import * as GroupRoot from "./Group"
import GroupNested from "./GroupNested"
import Heading from "./Heading"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import SidebarSkeleton from "./SidebarSkeleton"

const Group = Object.assign(GroupRoot, {
  Nested: GroupNested
})

export {
  SidebarSkeleton,
  Heading,
  Navbar,
  Sidebar,
  Group,
  DashboardContainer as Container
}
