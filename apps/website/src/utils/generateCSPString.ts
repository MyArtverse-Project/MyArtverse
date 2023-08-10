import { kebabCase } from "lodash"

type Schemes = "data:" | "https:" | "blob:" | "mediastream:" | "filesystem:"

type CSPDirective<T = {}> = {
  none?: boolean
  nonce?: string
  domains?: Schemes[] | string[]
} & T

interface SandboxDirectives {
  allowDownloads: boolean
  /** This value is experimental and is expected to change in the future */
  allowDownloadsWithoutUserActivation: boolean
  allowForms: boolean
  allowModals: boolean
  allowOrientationLock: boolean
  allowPointerLock: boolean
  allowPopups: boolean
  allowPopupsToEscapeSandbox: boolean
  allowPresentation: boolean
  allowSameOrigin: boolean
  allowScripts: boolean
  /** This value is experimental and is expected to change in the future */
  allowStorageAccessByUserActivation: boolean
  allowTopNavigation: boolean
  allowTopNavigationByUserActivation: boolean
  allowTopNavigationToCustomProtocols: boolean
}

interface CSPPolicies {
  defaultSrc?: CSPDirective
  frameSrc?: CSPDirective
  styleSrc?: CSPDirective<{
    unsafeInline?: boolean
    nonce?: string
    sha256?: string
    sha384?: string
    sha512?: string
  }>
  scriptSrc?: CSPDirective<{
    unsafeInline?: boolean
    unsafeEval?: boolean
    unsafeHashes?: boolean
    wasmUnsafeEval?: boolean
    strictDynamic?: boolean
    sha256?: string
    sha384?: string
    sha512?: string
  }>
  connectSrc?: CSPDirective
  imgSrc?: CSPDirective
  fontSrc?: CSPDirective
  workerSrc?: CSPDirective
  upgradeInsecureRequests?: boolean
  sandbox?: Partial<SandboxDirectives>
}

export function generateCSPString(policy: CSPPolicies) {
  let directives: string[] = []

  const joinSpaces = (s: string[]) => s.join(" ")

  Object.entries(policy).forEach(([directiveName, directiveValues]) => {
    directives.push(
      directiveName !== "upgradeInsecureRequests"
        ? `${kebabCase(directiveName)} 'self'`
        : kebabCase(directiveName)
    )

    Object.entries(directiveValues).forEach((v) => {
      const [nestedKey, nestedValue] = v

      if (nestedKey && v.includes(true)) {
        directives.push(`'${kebabCase(nestedKey)}'`)
      }
      if (v.includes("domains")) {
        directives.push(joinSpaces(nestedValue as string[]))
      }
      if (v.includes("nonce")) {
        directives.push(`'nonce-${nestedValue}'`)
      }
      if (v.includes("sha256")) {
        directives.push(`'sha256-${nestedValue}'`)
      }
      if (v.includes("sha384")) {
        directives.push(`'sha384-${nestedValue}'`)
      }
      if (v.includes("sha512")) {
        directives.push(`'sha512-${nestedValue}'`)
      }
    })

    directives.push(";")
  })

  const parsedOutput = joinSpaces(directives)
    .replace(/(\s;\s)/g, "; ")
    .replace(/\s;/g, ";")
  return parsedOutput
}
