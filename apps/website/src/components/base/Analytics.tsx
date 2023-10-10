import Script from "next/script"

import { headers } from "next/headers"
import dedent from "dedent"

export default function Analytics() {
  const nonce = headers().get("x-nonce")

  const umamiId = process.env.UMAMI_ID || ""
  const clarityId = process.env.MS_CLARITY_ID || ""

  return (
    <>
      {/* Site analytics - Umami */}
      <Script
        id="umami"
        defer
        src="https://analytics.eu.umami.is/script.js"
        data-website-id={umamiId}
      />
      {/* Behavior analytics - Microsoft Clarity */}
      <Script
        id="clarity"
        nonce={nonce}
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: dedent`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
            `
        }}
      />
    </>
  )
}
