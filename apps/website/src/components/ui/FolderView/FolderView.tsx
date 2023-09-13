import FolderItem from './FolderItem'
import Separator from '../Separator'

export default function FolderView({}: {}) {
  return (
      <div data-folder-view-editable="" className="flex-shrink-0 grid gap-y-0.5" style={{ width: "300px" }}>
       <FolderItem name='Characters' isOpen={false} active={false} />
       <Separator dir="horizontal" padding="0.5rem" />
       <FolderItem name='Characters' isOpen={false} active={false} /> 
       <FolderItem name='Characters' isOpen={false} active={false} /> 
       <FolderItem name='Characters' isOpen={false} active={false} /> 
       <FolderItem name='Characters' isOpen={false} active={false} /> 
    </div>
  )
}
