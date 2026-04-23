export function FolderViewContainer(props: React.PropsWithChildren) {
  return (
    <div data-fv-container="">
      <nav>breadcrumb nav visible for mobile users</nav>
      <div>{props.children}</div>
    </div>
  )
}
