module.exports = {
  semi: false,
  printWidth: 100,
  endOfLine: "lf",
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  overrides: [
    {
      files: ["tailwind.config.ts"],
      options: {
        printWidth: 180
      }
    }
  ],
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    ".scss$|.css$",
    "next|^next/(.*)",
    "react$|react-dom",
    "<THIRD_PARTY_MODULES>",
    "^@/types/(.*)$",
    "^hooks/(.*)$",
    "^components/(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true
}
