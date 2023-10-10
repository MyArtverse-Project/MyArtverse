import { LuAlertTriangle as AlertTriangleIcon } from "react-icons/lu"

export default function NoJSReminder() {
  return (
    <noscript>
      <div className="z-[9999] fixed top-0 left-0 right-0 px-8 py-4 text-white bg-red-600/50 prose-p:text-sm prose-p:pb-2">
        <h1 className="flex pb-2 not-prose text-xl font-bold font-inter gap-x-1.5 items-center">
          <AlertTriangleIcon />
          <span>JavaScript disabled</span>
        </h1>
        <p>
          MyFursona heavily relies on JavaScript - most modern browsers have
          JavaScript enabled and it looks like you're browsing MyFursona with
          either JavaScript disabled with the use of a third-party extension via
          an ad blocker or from an outdated and/or unsupported browser. This
          message can be dismissed by re-enabling JavaScript and reloading the
          browser.
        </p>
      </div>
    </noscript>
  )
}
