"use client"

import Image from "next/image"

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
        <Image
          alt=""
          src="/kuro_zzz.png"
          style={{ aspectRatio: "1/1" }}
          width={250}
          height={250}
        />
        <h2 className="not-prose text-4xl font-inter font-bold text-center my-3.5">
          Something went wrong!
        </h2>
      </div>
      <div className="text-lg whitespace-break-spaces mb-5">
        {`${error.name}: ${error.message}`}
      </div>
      <pre className="p-5 rounded-md border border-400 bg-300 bg-opacity-30 overflow-auto">
        <code>{error.stack}</code>
      </pre>
      <div className="flex justify-center mt-3">
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  )
}
