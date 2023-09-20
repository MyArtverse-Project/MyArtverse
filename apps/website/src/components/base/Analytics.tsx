import Script from "next/script"
import dedent from "dedent"
import { DEV_CONVERSION_INLINE_SCRIPT } from "@/constants"

export default function Analytics({ nonce }: { nonce: string }) {
  const devFallback = "owo"
  const umamiId = process.env.UMAMI_ID || devFallback
  const clarityId = process.env.CLARITY_ID || devFallback

  return (
    <>
      {/* Site analytics - Umami */}
      <Script
        id="umami"
        async
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id={umamiId}
      />
      {/* Behavior analytics - Microsoft Clarity */}
      <Script
        nonce={nonce}
        id="clarity"
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
      <Script
        nonce={nonce}
        strategy="beforeInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
      />
      <Script
        id="owo-whats-this"
        strategy="beforeInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: DEV_CONVERSION_INLINE_SCRIPT }}
        defer
      />
    </>
  )
}
