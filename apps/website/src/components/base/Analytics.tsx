import Script from "next/script"

export default function Analytics({ nonce }: { nonce: string }) {
  return (
    <>
      {/* Site analytics - Umami */}
      <Script
        id="umami"
        async
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id="XXXXXX"
      />
      {/* Behavior analytics - Microsoft Clarity */}
      <Script
        id="clarity"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "XXXXXX");
            `
        }}
      />
    </>
  )
}
