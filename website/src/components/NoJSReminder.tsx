import { AlertTriangleIcon } from "lucide-react"

export default function NoJSReminder() {
  return (
    <noscript>
      <div className="px-8 py-4 text-white bg-red-500 prose-p:text-sm">
        <h1 className="flex pb-2 text-xl font-bold font-inter gap-x-1.5 items-center">
          <AlertTriangleIcon />
          <span>JavaScript disabled</span>
        </h1>
        <p className="pb-2">
          Hello there! Most browsers have JavaScript enabled and it looks like
          you're browsing MyFursona with either JavaScript disabled with the use
          of a third-party extension or from an unsupported browser.
        </p>
        <p>
          Because of this, you can still browse the website like usual, however,
          most of the site's functionality have been heavily impacted and will
          not work as intended with JavaScript disabled. If you're paranoid
          about ads, we strive on making the platform entirely ad-free for
          everyone!
        </p>
      </div>
    </noscript>
  )
}
