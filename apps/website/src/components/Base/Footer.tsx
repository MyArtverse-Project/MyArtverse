import Link from "next/link"

import Logo from "../Logo"
import project from "../../../package.json"
import { CircleDotIcon } from "lucide-react"
import { kebabCase } from "lodash"

const version = project.version

export default function Footer() {
  /* NOTE: in the links array, you can override the links with the "link" key */
  const FOOTER_ITEMS = [
    {
      heading: "Explore",
      links: [
        { text: "MyFursona+", link: "/plus" },
        { text: "Developers" },
        { text: "Beta testing" }
      ]
    },
    {
      heading: "About MyFursona",
      links: [
        { text: "Team" },
        { text: "FAQ" },
        { text: "Open Source", link: "https://github.com/MyFursona-Project" },
        { text: "Changelog" },
        { text: "Design" },
        { text: "Contact Us" }
      ]
    },
    {
      heading: "Legal",
      links: [
        { text: "Community Guidelines" },
        { text: "Terms of Service" },
        { text: "Privacy Policy" },
        { text: "DMCA Policy" },
        { text: "Code of Conduct" }
      ]
    }
  ]

  return (
    <footer className="relative">
      <div className="flex flex-row justify-around px-12 py-6">
        <div className="flex flex-col justify-between w-fit">
          <div className="flex flex-col">
            <Logo size={1.1} />
            <Link
              href={"/"}
              className="flex flex-row px-2 py-1 my-3 border rounded-md border-color-2 w-fit"
            >
              <span>Status:</span>
              <span className="flex flex-row text-green-500">
                <CircleDotIcon className="mx-2" /> <p>All systems normal</p>
              </span>
            </Link>
          </div>
          <span>MyFursona v{version}</span>
        </div>
        <div className="flex flex-row">
          {FOOTER_ITEMS.map(({ heading, links }, index) => (
            <div className="flex flex-col mx-16" key={index}>
              <h2 className="mb-3 font-semibold text-color-4">{heading}</h2>
              <ul className="grid gap-y-3">
                {links.map(({ text, link }, index) => (
                  <li key={index}>
                    <Link
                      className="my-2 font-semibold"
                      href={!link ? kebabCase(text) : (link as any)}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div id="copyright" className="px-12 py-4 text-center">
        Copyright &copy; 2022-2023 MyFursona Project, and contributors; licensed
        under MIT.
      </div>
    </footer>
  )
}
