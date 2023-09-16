import GridResponsive from "../GridResponsive"

export default function FolderContents({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <GridResponsive breakpoint={250} className="gap-1.5">
      {children}
    </GridResponsive>
  )
}
