import Link from "next/link"
import { COPYRIGHT_ALL_RIGHTS_RESERVED } from "@mav/shared"
import { cn } from "@mav/shared/utils"
import { Button } from "@mav/ui/components/buttons"
import { MyArtverseIcon } from "@mav/ui/icons"
import { FaCircle } from "react-icons/fa"

const commitHashEnv = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || ""
const commitHash = commitHashEnv.slice(0, 7)

// TODO use a shortened version of the footer for certain routes and for logged in users
const footerLinks = [
  {
    heading: "Product",
    links: [
      { text: "Download", link: "/download" },
      { text: "Artists", link: "/features/artist" },
      { text: "Developers", link: "/features/developers" },
      { text: "Beta Testing", link: "/features/beta" },
      { text: "MyArtverse+", link: "/pricing" },
      { text: "Playground", link: "/playground" }
    ]
  },
  {
    heading: "Company",
    links: [
      { text: "About", link: "/about" },
      { text: "Blog", link: "/blog" },
      { text: "Contact Us", link: "/contact" },
      { text: "Changelog", link: "/changelog" },
      { text: "Open Source", link: "/opensource" },
      { text: "Branding", link: "/design" }
    ]
  },
  {
    heading: "Policies",
    links: [
      { text: "Guidelines", link: "/legal/guidelines" },
      { text: "Use of AI", link: "/legal/ai" },
      { text: "Acknowledgements", link: "/legal/acknowledgements" },
      { text: "Privacy Policy", link: "/legal/privacy" },
      { text: "Terms of Service", link: "/legal/tos" }
    ]
  }
]

// TODO: Pass the operation status as a prop to the Footer component
export function Footer({
  operationStatus = "Operational"
}: {
  operationStatus?: "Operational" | "Maintenance" | "Outage"
}) {
  return (
    <div className="border-t-400 border-t py-8">
      <footer className="font-inter mx-auto flex max-w-screen-xl flex-col gap-y-10 px-8">
        <div className="flex items-start gap-x-3.5">
          <section className="flex flex-col items-start gap-y-4">
            <Link
              href="/"
              className="-rotate-6 transition-transform hover:rotate-0"
            >
              <MyArtverseIcon size={1.4} logoOnly />
            </Link>
            <Button
              variant="secondary"
              size="small"
              prefix={<span>{"Status: "}</span>}
            >
              <div
                className={cn(
                  "inline-flex items-center gap-x-1.5 p-0.5",
                  operationStatus == "Operational"
                    ? "text-success"
                    : operationStatus == "Maintenance"
                      ? "text-warning"
                      : "text-alert"
                )}
              >
                <FaCircle />
                {/* TODO: design, bad contrast ratio when switched to light mode */}
                <span>{operationStatus}</span>
              </div>
            </Button>
          </section>
          <section className="flex flex-1 items-start justify-evenly">
            {footerLinks.map((item, index) => (
              <ul key={index} className="flex flex-col gap-y-4">
                <li className="text-600 font-semibold opacity-50">
                  {item.heading}
                </li>
                <li className="flex flex-col gap-y-4">
                  {item.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.link}
                      className="text-700 hover:text-600"
                    >
                      {link.text}
                    </Link>
                  ))}
                </li>
              </ul>
            ))}
          </section>
        </div>
        <div className="text-subtext flex gap-x-4 opacity-75">
          <div className="w-full">{COPYRIGHT_ALL_RIGHTS_RESERVED}</div>
          {!commitHashEnv ? (
            <span className="cursor-help underline decoration-dashed">
              Development
            </span>
          ) : (
            <Link
              className="text-subtext underline hover:text-blue-400"
              href={`https://github.com/MyArtverse-Project/MyArtverse/commit/${commitHash}`}
            >
              {commitHash}
            </Link>
          )}
        </div>
      </footer>
    </div>
  )
}
