import { AlertTriangleIcon } from "lucide-react"

export default function NoJSReminder() {
  return (
    <noscript>
      <div className="px-8 py-4 text-white bg-red-500 prose-p:text-sm prose-p:pb-2">
        <h1 className="flex pb-2 not-prose text-xl font-bold font-inter gap-x-1.5 items-center">
          <AlertTriangleIcon />
          <span>JavaScript disabled</span>
        </h1>
        <p>
          Most modern browsers have JavaScript enabled and it looks like you're
          browsing MyFursona with either JavaScript disabled with the use of a
          third-party extension via an ad blocker or from an unsupported
          browser.
        </p>
        <p>
          You can still browse normally, however, most of the site's
          functionality will not work correctly as intended as it relies
          JavaScript for this.
        </p>
        <p>
          If you're paranoid about ads or data tracking, we strive on making the
          platform entirely ad-free for everyone and we don't track your
          personal info! This message can be dismissed by re-enabling JavaScript
          and reloading the browser.
        </p>
      </div>
    </noscript>
  )
}
