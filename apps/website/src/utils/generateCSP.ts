type Directive =
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
      | "nonce-"
    )[]
  | string[]

type Policies = Partial<{
  "script-src": Directive | "wasm-unsafe-eval"[]
  "connect-src": Directive | "wasm-unsafe-eval"[]
  "default-src": Directive
  "style-src": Directive
  "font-src": Directive
  "frame-src": Directive
  "object-src": Directive
  "base-uri": Directive
  "frame-ancestors": "none"[] | string[]
  "img-src": Directive
  "worker-src": Directive
  "upgrade-insecure-requests": true
}>

export function generateCSP(policy: Policies): string {
  const _directivesArr = []

  const joinSpaces = (s: string[]) => s.join(" ")

  Object.entries(policy).forEach(([directive, values]) => {
    if (directive !== "upgrade-insecure-requests") {
      const parsedValues = joinSpaces(
        (values as string[]).map((value) => {
          if (value === "self") return `'self'`
          if (value === "none") return `'none'`
          if (value === "unsafe-inline") return `'unsafe-inline'`
          if (value === "strict-dynamic") return `'strict-dynamic'`
          if (value === "unsafe-hashes") return `'unsafe-hashes'`
          if (value === "unsafe-eval") return `'unsafe-eval'`
          if (value.startsWith("nonce-") || value.startsWith("sha")) return `'${value}'`

          return value
        })
      )

      _directivesArr.push(`${directive} ${parsedValues};`)
    }

    if (directive == "upgrade-insecure-requests") {
      _directivesArr.push(`upgrade-insecure-requests;`)
    }
  })

  return joinSpaces(_directivesArr)
    .replace(/(\s;\s)/g, "; ")
    .replace(/\s;/g, ";")
}
