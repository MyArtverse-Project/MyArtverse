import React from "react"

export default function ProseWrapper({
  children,
  as: Element = "div"
}: {
  children: React.ReactNode
  as?: keyof HTMLElementTagNameMap
}) {
  return (
    <Element
      data-prose-wrapper=""
      className="prose-headings:font-inter prose-headings:my-2 prose-h1:text-5xl prose-h2:text-[2.75rem] prose-h3:text-4xl prose-h4:text-[2rem] prose-h5:text-[1.65rem]"
    >
      {children}
    </Element>
  )
}
