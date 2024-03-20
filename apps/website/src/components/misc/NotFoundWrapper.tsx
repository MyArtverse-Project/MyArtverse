import { MFImage } from "../ui"
import { Button } from "../ui/Buttons"

export default function NotFoundWrapper() {
  return (
    <div className="mx-auto max-w-screen-lg px-12 pb-5 pt-32">
      <article className="text-center">
        <div className="flex flex-col items-center justify-center">
          <MFImage src="/kuro_confused.png" aspectRatio="1" width={250} />
          <h2 className="not-prose font-inter my-5 text-center text-4xl font-bold">
            404 Not Found
          </h2>
        </div>
        <p className="text-lg opacity-75">
          Unless you've traveled back in time, the page you're looking for doesn't exist
          anymore.
        </p>
        <div className="mx-auto mt-6 w-fit">
          <Button href="/" size="big">
            Go home
          </Button>
        </div>
      </article>
    </div>
  )
}
