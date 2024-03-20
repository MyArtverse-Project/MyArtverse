import Link from "next/link"
import { MyFursonaIcon } from "@/components/icons"
import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

export default function ErrorWrapper({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <>
      <div className="px-5 py-3">
        <Link href="/" aria-label="Home" title="Home">
          <MyFursonaIcon />
        </Link>
      </div>
      <div className="mx-auto max-w-screen-lg px-12 pb-5 pt-16">
        <div className="flex flex-col items-center">
          <MFImage src="/ozzy_depressed.png" aspectRatio="1" width={250} />
          <h2 className="not-prose font-inter my-3.5 text-center text-4xl font-bold">
            Oh no! Something goof'd up!
          </h2>
        </div>
        <div className="mb-10 w-full whitespace-break-spaces text-center text-lg opacity-75">
          {error.message}
        </div>
        <div className="border-400 bg-300 overflow-hidden rounded-md border bg-opacity-30">
          <div className="border-b-400 font-inter border-b px-6 pb-3.5 pt-4">
            Stack trace (for nerds only)
          </div>
          <div className="bg-100 bg-opacity-100">
            <pre className="!select-text overflow-auto p-4 font-mono">{error.stack}</pre>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </>
  )
}
