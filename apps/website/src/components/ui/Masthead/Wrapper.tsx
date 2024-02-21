export default function MastheadWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div data-masthead-wrapper="" className="mx-auto flex max-w-screen-2xl gap-x-4 px-9">
      {children}
    </div>
  )
}
