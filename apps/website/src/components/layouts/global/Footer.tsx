"use client"

import Link from "next/link"
import { kebabCase } from "lodash"
import { LuHeart as HeartIcon } from "react-icons/lu"
import project from "../../../../package.json"
import { MyFursonaIcon } from "../../icons"
import { BuiLink } from "../../ui"
import FooterGradient from "./FooterGraphics"

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
        { text: "Contributing" },
        { text: "Open Source" },
        { text: "Licenses" }
      ]
    },
    {
      heading: "Legal",
      links: [
        { text: "About MyFursona" },
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
        <h2 className="not-prose font-inter text-500 mb-2 text-lg font-semibold">
          {heading}
        </h2>
        <ul className="grid gap-y-3">
          {links.map(({ text, link }, index) => (
            <li key={index}>
              <Link
                className="my-2 font-semibold"
                href={!link ? `/${kebabCase(text)}` : (link as any)}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const commitHashEnv = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || ""
  const commitHash = commitHashEnv.slice(0, 7)

  return (
    <div className="relative overflow-y-hidden before:absolute before:inset-0 before:bottom-[unset] before:h-[1px] before:bg-gradient-to-r before:from-cyan-600 before:to-fuchsia-600">
      <footer>
        <section className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between px-8 pb-6 pt-12 md:flex-row md:items-start">
          <div className="flex flex-col">
            <div className="flex flex-col md:mx-auto">
              <Link className="mb-4" href="/">
                <MyFursonaIcon size={1.125} />
              </Link>
              <BuiLink href={"https://stats.uptimerobot.com/rlVXRfwrKz"}>
                MyFursona Status
              </BuiLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center sm:text-left md:mt-5 md:grid-cols-2 lg:grid-cols-3">
            {FOOTER_ITEMS.map(({ heading, links }, index) => (
              <ColumnItems heading={heading} links={links} key={index} />
            ))}
          </div>
        </section>
        <section className="text-subtext prose-p:my-4 p-4 text-center text-sm">
          <p>
            {`MyFursona is an open source project licensed under Apache License 2.0.
             © 2022-${new Date().getFullYear()} Fusky Labs Software Ltd.`}
          </p>
          <div className="mb-4 mt-0 inline-flex flex-wrap gap-x-4">
            {!commitHashEnv ? (
              <span aria-hidden>Development</span>
            ) : (
              <Link
                className="text-subtext underline hover:text-blue-400"
                href={`https://github.com/MyFursona-Project/MyFursona/commit/${commitHash}`}
                aria-hidden
              >
                {commitHash}
              </Link>
            )}
            <span aria-hidden>{version}</span>
            <p
              className="!my-0 flex flex-wrap items-center justify-center"
              aria-label="Made with love by the MyFursona contributors"
            >
              {"Made with"}
              <HeartIcon size={16} className="text-500 mx-1" />
              by&nbsp;
              <BuiLink href="https://github.com/MyFursona-Project/MyFursona/graphs/contributors">
                the MyFursona contributors!
              </BuiLink>
            </p>
          </div>
        </section>
      </footer>
      <FooterGradient />
    </div>
  )
}
