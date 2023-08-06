import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404"
}

export default function NotFoundCatchAll() {
  return (
    <div id="error-page" className="grid place-items-center">
      <article className="text-center prose-h1:text-3xl">
        <h1>404</h1>
        <p>Page doesn't exist cutie</p>
      </article>
    </div>
  )
}
