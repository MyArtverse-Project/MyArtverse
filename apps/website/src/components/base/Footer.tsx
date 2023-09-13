"use client";

import Link from "next/link";
import project from "../../../package.json";
import { kebabCase } from "lodash-es";
import { Button } from "../ui/Buttons";
import { MyFursona } from "../icons";

const version = project.version;

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
  ];

  const ColumnItems = ({
    heading,
    links
  }: {
    heading: string;
    links: Array<{ text?: string; link?: string }>;
  }) => {
    return (
      <div className="flex flex-col">
        <h2 className="not-prose text-lg font-inter mb-2 font-semibold text-500">
          {heading}
        </h2>
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
    );
  };

  const commitHashEnv =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "reserved";
  const commitHash = commitHashEnv.slice(0, 8);

  return (
    <div className="relative">
      <footer>
        <section className="px-4 pb-6 pt-12 mx-auto max-w-screen-2xl">
          <div className="flex flex-col">
            <div className="flex flex-col md: mx-auto">
              <Link className="mb-4" href="/">
                <MyFursona size={1.1} />
              </Link>
              <Button href={"/"} variant="secondary">
  <span id="mf-status" className="flex flex-row text-success">
    <span className="text-700">Status:</span>
    <span>All systems normal</span>
  </span>
</Button>
            </div>
            <span className="md: mx-auto md: mt-5">
              {`MyFursona ${version} `}
              {commitHashEnv ? (
                <Link
                  className="underline text-blue-400 hover:text-blue-500"
                  href={`https://github.com/MyFursona-Project/MyFursona/commit/${commitHash}`}
                >
                  {commitHash}
                </Link>
              ) : (
                "RESERVED"
              )}
            </span>
          </div>
          <div className="sm: text-center lg:text-left grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md: mt-5">
            {FOOTER_ITEMS.map(({ heading, links }, index) => (
              <ColumnItems heading={heading} links={links} key={index} />
            ))}
          </div>
        </section>
        <section
          id="copyright"
          className="p-4 text-center text-sm text-subtext"
        >
          {`MyFursona is an open source project licensed under Apache-2.0.
          © 2022-${new Date().getFullYear()} Fusky Labs Software Ltd.`}
        </section>
      </footer>
      <svg className="absolute top-0 -z-[1] w-full h-full" aria-hidden></svg>
    </div>
  );
}
