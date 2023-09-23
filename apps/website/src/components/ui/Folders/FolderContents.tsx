export default function FolderContents({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div id="folder-contents" className="w-full">
      {children}
    </div>
  )
}
