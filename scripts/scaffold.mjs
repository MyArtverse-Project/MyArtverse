// @ts-check
/**
 * A simple Node script for scaffolding React pages/components
 */
import path from "path"
import { fileURLToPath } from "url"
import { mkdir, writeFile } from "fs/promises"
import { parseArgs } from "node:util"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Argparser
const args = parseArgs({
  allowPositionals: true,
  options: {
    type: {
      type: "string",
      default: "page",
      short: "t"
    },
    "with-children": {
      type: "boolean"
    }
  }
})

const scaffoldType = args.values.type
const fileArgs = args.positionals

const pageArgs = scaffoldType !== "page" && scaffoldType !== "p"
const componentArgs = scaffoldType !== "component" && scaffoldType !== "c"

if (pageArgs && componentArgs) {
  throw new Error(
    `Scaffold type invalid, expected args "page", "component", and it's first-letter shorthands; got ${scaffoldType} instead`
  )
}

if (fileArgs.length < 1) {
  throw new Error("Page/component name not defined")
}

/**
 * @param {string} fileName
 */
const scaffoldPage = (fileName) => {
  // prettier-ignore
  const template = `import { pageMeta } from "@/utils"

export const metadata = pageMeta({
  title: "${fileName}",
  description: "${fileName} page"
})

export default function ${fileName}Page() {
  return <div>${fileName} contents</div>
}`

  return template
}

// TODO do something with this unused function
/**
 * @param {string} fileName
 * @param {boolean} withChildren
 */
const scaffoldComponent = (fileName, withChildren) => {
  const functionBody = `export default function ${fileName}({}: ${fileName}Props) {
  return <div>${fileName} component</div>
}`
  // prettier-ignore
  const withChildTemplate = `import type { IncludeReactNode } from "@/types"
  
  ${functionBody}
  `
  // prettier-ignore
  const noChildTemplate = `interface ${fileName}Props {}
  
  ${functionBody}
  `
}

fileArgs.map((file) => {
  if (!pageArgs) {
    const fileRoute = file.toLocaleLowerCase()
    const nextjsAppPageDir = `${process.cwd()}/website/src/app`

    mkdir(path.resolve(__dirname, `${nextjsAppPageDir}/${fileRoute}`))
    writeFile(
      path.resolve(__dirname, `${nextjsAppPageDir}/${fileRoute}/page.tsx`),
      scaffoldPage(file)
    )
    console.log(`Successfully scaffolded ${file}.tsx!`)

    return
  }
})
