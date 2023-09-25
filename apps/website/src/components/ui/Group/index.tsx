import Group from "./Group"
import GroupTitle from "./GroupTitle"
import GroupButtons from "./GroupButtons"
import GroupContents from "./GroupContents"

export default Object.assign(Group, {
  Header: GroupTitle,
  HeaderButtons: GroupButtons,
  Content: GroupContents
})
