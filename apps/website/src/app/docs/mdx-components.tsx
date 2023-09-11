import type { MDXComponents } from "mdx/types"

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 style={{ fontSize: "3rem" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: "2.5rem" }}>{children}</h2>,
    ...components
  }
}
