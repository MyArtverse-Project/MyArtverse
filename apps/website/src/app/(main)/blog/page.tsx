import type { Metadata } from "next"
import { MarginClamp, Separator, Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { LuRss as RssIcon, LuSearch as SearchIcon } from "react-icons/lu"

const title = "Blog"
const description = "Tune in for the latest news about MyFursona"

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
}

export default function Page() {
  return (
    <main className="contents">
      <section className="relative flex h-[25rem] flex-col items-center justify-center gap-y-5 rounded-bl-xl rounded-br-xl bg-gradient-to-tr  from-fuchsia-500 via-blue-900 to-purple-900 text-center">
        <h1 className="not-prose font-inter text-6xl font-bold">MyFursona Blog</h1>
        <p className="text-xl">{description}</p>
      </section>
      <div className="sticky top-28 -mb-4 grid -translate-y-6 place-items-center">
        <div className="font-inter bg-100 flex items-center rounded-md px-3 py-1">
          <Tabs
            baseURL="/blog"
            items={[
              { link: "/", text: "All posts" },
              { link: "/updates", text: "Updates" },
              { link: "/events", text: "Events" },
              { link: "/changelogs", text: "Changelogs" }
            ]}
          />
          <div className="ml-auto flex items-center gap-x-1">
            <Separator dir="vertical" size="2rem" padding={5} />
            <Button
              variant="tritery"
              icon={<SearchIcon size={21} />}
              aria-label="Search"
            />
            <Button
              variant="tritery"
              icon={<RssIcon size={21} />}
              aria-label="RSS Feed"
            />
          </div>
        </div>
      </div>
      <MarginClamp as="section">
        <div>MyFursonaInternal</div>
      </MarginClamp>
    </main>
  )
}
