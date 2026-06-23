import { COPYRIGHT_ALL_RIGHTS_RESERVED } from "@mav/shared"
import { cn } from "@mav/shared/utils"
import { Button } from "@/components/ui/button"
import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import {
  getFrontendCommit,
  shortCommit,
} from "@/utils/buildInfo"
import Link from "next/link"
import { FaCircle } from "react-icons/fa"

const frontendCommit = getFrontendCommit()

const FRONTEND_REPO = "https://github.com/MyArtverse-Project/MyArtverse/commit"
const API_REPO = "https://github.com/MyArtverse-Project/API/commit"

function CommitLink({
  label,
  commit,
  repoUrl,
}: {
  label: string
  commit: string | null
  repoUrl: string
}) {
  if (!commit) {
    return (
      <span className="cursor-help underline decoration-dashed">
        {label}: Development
      </span>
    )
  }

  const short = shortCommit(commit)

  return (
    <Link
      className="text-muted-foreground hover:text-foreground underline transition-colors"
      href={`${repoUrl}/${commit}`}
    >
      {label}: {short}
    </Link>
  )
}

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
  operationStatus = "Operational",
  apiCommit = null,
}: {
  operationStatus?: "Operational" | "Maintenance" | "Outage"
  apiCommit?: string | null
}) {
  return (
    <div className="border-border border-t py-8">
      <footer className="font-inter mx-auto flex max-w-screen-xl flex-col gap-y-10 px-8">
        <div className="flex items-start gap-x-3.5">
          <section className="flex flex-col items-start gap-y-4">
            <Link
              href="/"
              className="-rotate-6 transition-transform hover:rotate-0"
            >
              <MyArtverseIcon size={1.4} logoOnly />
            </Link>
            <Button variant="secondary" size="sm">
              <span>{"Status: "}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-x-1.5",
                  operationStatus == "Operational"
                    ? "text-success"
                    : operationStatus == "Maintenance"
                      ? "text-warning"
                      : "text-destructive"
                )}
              >
                <FaCircle />
                <span>{operationStatus}</span>
              </span>
            </Button>
          </section>
          <section className="flex flex-1 items-start justify-evenly">
            {footerLinks.map((item, index) => (
              <ul key={index} className="flex flex-col gap-y-4">
                <li className="text-muted-foreground font-semibold">
                  {item.heading}
                </li>
                <li className="flex flex-col gap-y-4">
                  {item.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.link}
                      className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  ))}
                </li>
              </ul>
            ))}
          </section>
        </div>
        <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div>{COPYRIGHT_ALL_RIGHTS_RESERVED}</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <CommitLink
              label="Frontend"
              commit={frontendCommit}
              repoUrl={FRONTEND_REPO}
            />
            <span aria-hidden className="text-border">
              ·
            </span>
            <CommitLink
              label="API"
              commit={apiCommit}
              repoUrl={API_REPO}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
