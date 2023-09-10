"use client"

import Link from "next/link"

import project from "../../../package.json"
import { kebabCase } from "lodash-es"
import { Button } from "../ui/Buttons"
import { MyFursona } from "../icons"

const version = project.version

export default function Footer() {
  /* NOTE: in the links array, you can override the links with the "link" key */
  const FOOTER_ITEMS = [
    {
      heading: "Explore",
      links: [
        { text: "Download client" },
        { text: "MyFursona+", link: "/plus" },
        { text: "Beta testing" },
        { text: "Contact" }
      ]
    },
    {
      heading: "Resources",
      links: [
        { text: "Blog" },
        { text: "FAQ" },
        { text: "Brand" },
        { text: "Developers" },
        { text: "Report Issue" }
      ]
    },
    {
      heading: "Company",
      links: [
        { text: "About MyFursona" },
        { text: "Contributing" },
        { text: "Open Source", link: "https://github.com/MyFursona-Project" },
        { text: "Licenses" }
      ]
    },
    {
      heading: "Legal",
      links: [
        { text: "Community Guidelines" },
        { text: "Terms of Service" },
        { text: "Privacy Policy" }
      ]
    }
  ]

  const ColumnItems = ({
    heading,
    links
  }: {
    heading: string
    links: Array<{ text?: string; link?: string }>
  }) => {
    return (
      <div className="flex flex-col">
        <h2 className="mb-4 font-semibold text-400">{heading}</h2>
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
    )
  }

  return (
    <div className="relative">
      <footer>
        <section className="flex justify-between px-12 pb-6 pt-48 mx-auto max-w-screen-2xl">
          <div className="flex flex-col justify-between w-fit">
            <div className="flex flex-col">
              <Link href="/">
                <MyFursona size={1.1} />
              </Link>
              <Button href={"/"} variant="secondary">
                <span id="mf-status" className="flex flex-row text-success">
                  <span className="text-700">Status:</span>
                  <span>All systems normal</span>
                </span>
              </Button>
            </div>
            <span>MyFursona v{version} - COMMIT HASH</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {FOOTER_ITEMS.map(({ heading, links }, index) => (
              <ColumnItems heading={heading} links={links} key={index} />
            ))}
          </div>
        </section>
        <section id="copyright" className="px-12 py-4 text-center">
          The MyFursona Project is under the Apache-2.0 license. &copy;
          2022-2023 Fusky Labs Software Ltd.
        </section>
      </footer>
      <svg className="absolute top-0 -z-[1] w-full h-full" aria-hidden></svg>
    </div>
  )
}
