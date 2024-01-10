/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["myfursona"],
  settings: {
    next: {
      rootDir: ["apps/website/"]
    }
  }
}
