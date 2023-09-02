type CSPDirective =
  | (
      | "none"
      | "self"
      | "unsafe-inline"
      | "unsafe-hashes"
      | "unsafe-eval"
      | "strict-dynamic"
      | "blob:"
      | "https:"
      | "data:"
      | "mediastream:"
      | "nonce-"
      | "sha256-"
    )[]
  | string[]
type CSPDirectiveWithWasm = CSPDirective | "wasm-unsafe-eval"[]

type CSPPolicies = Partial<{
  "script-src": CSPDirectiveWithWasm
  "connect-src": CSPDirectiveWithWasm
  "default-src": CSPDirective
  "style-src": CSPDirective
  "font-src": CSPDirective
  "frame-src": CSPDirective
  "frame-ancestors": "none"[] | string[]
  "img-src": CSPDirective
  "worker-src": CSPDirective
  "upgrade-insecure-requests": true
}>

export function generateCSP(policy: CSPPolicies): string {
  let _directives = []

  const joinSpaces = (s: string[]) => s.join(" ")

  Object.entries(policy).forEach(([directive, values]) => {
    if (directive !== "upgrade-insecure-requests") {
      const parsedValues = joinSpaces(
        (values as string[]).map((value) => {
          if (value === "self") return `'self'`
          if (value === "none") return `'none'`
          if (value === "unsafe-inline") return `'unsafe-inline'`
          if (value === "unsafe-hashes") return `'unsafe-hashes'`
          if (value === "unsafe-eval") return `'unsafe-eval'`
          if (value.startsWith("nonce-") || value.startsWith("sha"))
            return `'${value}'`
          return value
        })
      )

      _directives.push(`${directive} ${parsedValues};`)
    }
    if (directive == "upgrade-insecure-requests") {
      _directives.push(`upgrade-insecure-requests;`)
    }
  })

  return joinSpaces(_directives)
    .replace(/(\s;\s)/g, "; ")
    .replace(/\s;/g, ";")
}
