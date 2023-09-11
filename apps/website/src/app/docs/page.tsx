import { readdirSync, readFileSync } from "fs"
import path from "path"
import matter from "gray-matter"

import Link from "next/link"

export default function Page() {
  const docsDir = "docs"
  const files = readdirSync(path.join(docsDir))

  const docsItem = files.map((filename) => {
    const fileContent = readFileSync(path.join(docsDir, filename), "utf-8")
    const { data: frontMatter } = matter(fileContent)

    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", "")
    }
  })

  return (
    <div>
      {docsItem.map((item, index) => (
        <div key={index}>{item.slug}</div>
      ))}
    </div>
  )
}
