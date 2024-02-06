import FolderContents from "./FolderContents"
import FolderItem from "./FolderItem"
import FolderShelf from "./FolderShelf"
import FolderView from "./FolderView"

export default Object.assign(FolderView, {
  Item: FolderItem,
  Shelf: FolderShelf,
  Contents: FolderContents
})
