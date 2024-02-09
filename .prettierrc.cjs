module.exports = {
  semi: false,
  printWidth: 90,
  endOfLine: "lf",
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["tailwind.config.ts", "**/types/*.ts"],
      options: {
        printWidth: 180
      }
    }
  ],
  // prettier-plugin-sort-imports config
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
