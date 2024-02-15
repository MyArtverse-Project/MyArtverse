/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["unused-imports"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": "off",
    "unused-imports/no-unused-imports": "warn"
  }
}
