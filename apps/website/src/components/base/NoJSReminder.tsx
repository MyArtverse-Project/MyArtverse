import { BRAND } from "@myfursona-internal/config"
import { LuAlertTriangle } from "react-icons/lu"

export default function NoJSReminder() {
  return (
    <noscript>
      <div className="prose-p:text-sm prose-p:pb-2 fixed left-0 right-0 top-0 z-[9999] bg-red-600/50 px-8 py-4 text-white">
        <h1 className="not-prose font-inter flex items-center gap-x-1.5 pb-2 text-xl font-bold">
          <LuAlertTriangle />
          <span>JavaScript disabled</span>
        </h1>
        <p>
          {`${BRAND} heavily relies on JavaScript; it looks like you're browsing ${BRAND} with
          either JavaScript disabled with the use of a browser extension via an ad blocker
          or from an outdated and/or unsupported browser.`}
        </p>
      </div>
    </noscript>
  )
}
