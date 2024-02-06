import { readFileSync, readdirSync } from "fs"

const DIRS = ["packages", "apps"]

const lol = readdirSync(`${__dirname}/apps`, { withFileTypes: true })

lol.forEach((lmao) => {
  console.log(lmao)
})
