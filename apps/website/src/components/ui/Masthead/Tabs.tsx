import Tabs from "../Tabs"

/** A wrapper for the `<Tabs />` component to be used for Masthead */
export default function MastheadTabs(props: React.ComponentProps<typeof Tabs>) {
  return (
    <div className="bg-100 sticky top-[3.75rem] z-[3] overflow-x-auto">
      <div className="mx-auto max-w-screen-2xl px-9">
        <Tabs {...props} />
      </div>
      <div
        className="border-b-separator relative -z-[1] w-full border-0 border-b-2 border-opacity-50"
        aria-hidden
      ></div>
    </div>
  )
}
