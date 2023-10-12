"use client"
import { MDXProvider } from "@mdx-js/react"
import { useMDXComponents } from "./mdx-components"
import CommunityGuidelines from "./community-guidelines.mdx"

export default function Home() {
  const customComponents = useMDXComponents({})

  return (
    <MDXProvider components={customComponents}>
      <CommunityGuidelines />
    </MDXProvider>
  )
}
