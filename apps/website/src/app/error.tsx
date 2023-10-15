"use client"

import { BuiImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="pt-16 pb-5 px-12 max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center">
        <BuiImage src="/ozzy_depressed.png" aspectRatio="1" width={250} />
        <h2 className="not-prose text-4xl font-inter font-bold text-center my-3.5">
          Something went wrong!
        </h2>
      </div>
      <div className="text-lg opacity-75 whitespace-break-spaces mb-5">
        {`${error.name}: ${error.message}`}
      </div>
      <pre className="p-6 rounded-md border border-400 bg-300 bg-opacity-30 overflow-auto">
        <code>{error.stack}</code>
      </pre>
      <div className="flex justify-center mt-3">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  )
}
