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
      <section className="relative text-center h-[25rem] flex justify-center items-center flex-col gap-y-5 bg-gradient-to-tr from-fuchsia-500  via-blue-900 to-purple-900 rounded-bl-xl rounded-br-xl">
        <h1 className="not-prose text-6xl font-bold font-inter">MyFursona Blog</h1>
        <p className="text-xl">{description}</p>
      </section>
      <div className="sticky top-28 -translate-y-6 grid place-items-center -mb-4">
        <div className="px-3 py-1 rounded-md flex items-center font-inter bg-100">
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
            <Button variant="tritery" iconOnly aria-label="Search">
              <SearchIcon size={21} />
            </Button>
            <Button variant="tritery" iconOnly aria-label="RSS Feed">
              <RssIcon size={21} />
            </Button>
          </div>
        </div>
      </div>
      <MarginClamp as="section">
        <div>MyFursonaInternal</div>
      </MarginClamp>
    </main>
  )
}
