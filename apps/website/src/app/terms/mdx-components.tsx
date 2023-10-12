import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h1: (props) => (
      <h1 style={{ fontSize: "30px", margin: "40px 20px" }} {...props} />
    ),
    h2: (props) => (
      <h2 style={{ fontSize: "20px", margin: "40px 20px" }} {...props} />
    ),
    p: (props) => <p style={{ fontSize: "15px", margin: "20px" }} {...props} />,
    ...components
  }
}
