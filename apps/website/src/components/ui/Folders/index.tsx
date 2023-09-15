import FolderItem from "./FolderItem"
import FolderShelf from "./FolderShelf"
import FolderView from "./FolderView"
import FolderContents from "./FolderContents"

export default Object.assign(FolderView, {
  Item: FolderItem,
  Shelf: FolderShelf,
  Contents: FolderContents
})
