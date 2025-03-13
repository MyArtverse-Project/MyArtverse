export function MastheadBanner(props: React.PropsWithChildren) {
  return (
    <div data-mh-banner="" className="relative aspect-[15/3] w-full">
      {props.children}
    </div>
  )
}
