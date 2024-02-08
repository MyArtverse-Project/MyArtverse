"use client"

import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-screen-lg px-12 pb-5 pt-16">
      <div className="flex flex-col items-center">
        <MFImage src="/ozzy_depressed.png" aspectRatio="1" width={250} />
        <h2 className="not-prose font-inter my-3.5 text-center text-4xl font-bold">
          Something went wrong!
        </h2>
      </div>
      <div className="mb-5 whitespace-break-spaces text-lg opacity-75">{`${error.name}: ${error.message}`}</div>
      <pre className="border-400 bg-300 overflow-auto rounded-md border bg-opacity-30 p-6">
        <code>{error.stack}</code>
      </pre>
      <div className="mt-3 flex justify-center">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  )
}
