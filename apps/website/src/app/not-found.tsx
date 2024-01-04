import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404'd",
  robots: {
    index: false
  }
}

export default function NotFoundCatchAll() {
  return (
    <div className="pt-32 pb-5 px-12 max-w-screen-lg mx-auto">
      <article className="text-center">
        <div className="flex flex-col items-center justify-center">
          <MFImage src="/kuro_confused.png" aspectRatio="1" width={250} />
          <h2 className="not-prose text-4xl font-inter font-bold text-center my-5">
            404 Not Found
          </h2>
        </div>
        <p className="text-lg opacity-75">
          Unless you've traveled back in time, the page you're looking for
          doesn't exist anymore.
        </p>
        <div className="w-fit mx-auto mt-6">
          <Button href="/" size="big">
            Go home
          </Button>
        </div>
      </article>
    </div>
  )
}
