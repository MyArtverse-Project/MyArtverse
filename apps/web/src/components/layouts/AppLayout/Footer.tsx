import Link from "next/link"
import { COPYRIGHT_ALL_RIGHTS_RESERVED } from "@mav/shared"
import { cn } from "@mav/shared/utils"
import { MyArtverseIcon } from "@mav/ui/icons"
import { FaCircle } from "react-icons/fa"

const commitHashEnv = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || ""
const commitHash = commitHashEnv.slice(0, 7)

const footerLinks = [
  {
    category: "Features",
    links: [
      { text: "For Artists", link: "/artist" },
      { text: "For Developers", link: "/developer" },
      { text: "Beta Testing", link: "/beta" },
      { text: "MyArtverse API", link: "/api" },
    ],
  },
  {
    category: "Services",
    links: [
      { text: "Download", link: "/client" },
      { text: "MyArtverse+", link: "/plus" },
      { text: "Playground", link: "/playground" },
    ],
  },
  {
    category: "Company",
    links: [
      { text: "About", link: "/about" },
      { text: "Blog", link: "/blog" },
      { text: "FAQ", link: "/faq" },
      { text: "Open Source", link: "/opensource" },
      { text: "Changelog", link: "/changelog" },
      { text: "Design", link: "/design" },
    ],
  },
  {
    category: "Policies",
    links: [
      { text: "Community Guidelines", link: "/guidelines" },
      { text: "Use of AI", link: "/ai" },
      { text: "Privacy Policy", link: "/privacy" },
      { text: "Terms of Service", link: "/tos" },
    ],
  },
]

// TODO: Pass the operation status as a prop to the Footer component
export function Footer({
  operationStatus = "Operational",
}: {
  operationStatus?: "Operational" | "Maintenance" | "Outage"
}) {
  return (
    <div className="border-t-400 border-t py-8">
      <footer className="font-inter mx-auto flex max-w-screen-xl flex-col gap-y-10 px-8">
        <div className="flex items-start gap-x-3.5">
          <div className="flex flex-col gap-y-4">
            <Link href="/" className="hover:opacity-60">
              <MyArtverseIcon size={0.8} />
            </Link>
            <div className="flex flex-row p-2 border border-300 rounded-md w-fit">
              <p>Status: </p>
              <p
                className={cn(
                  "flex flex-row items-center gap-x-1.5 pl-2 text-sm",
                  operationStatus == "Operational"
                    ? "text-success"
                    : operationStatus == "Maintenance"
                      ? "text-warning"
                      : "text-alert",
                )}
              >
                <FaCircle /> {operationStatus}
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-start justify-evenly">
            {footerLinks.map((item, index) => (
              <div key={index} className="flex flex-col gap-y-4">
                <span className="text-500 font-semibold">{item.category}</span>
                <div className="flex flex-col gap-y-4">
                  {item.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.link}
                      className="text-subtext hover:text-600"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
