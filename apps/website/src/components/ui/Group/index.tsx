import Group from "./Group"
import GroupButtons from "./GroupButtons"
import GroupContents from "./GroupContents"
import GroupTitle from "./GroupTitle"

export default Object.assign(Group, {
  Header: GroupTitle,
  HeaderButtons: GroupButtons,
  Content: GroupContents
})
