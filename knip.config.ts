import { type KnipConfig } from "knip"

export default {
  eslint: {
    config: [".eslintrc.json"]
  },
  entry: ["apps/**/src/**/*.{ts,tsx}!", "packages/**/*.{js,ts,tsx}!"],
  project: ["**/*.{ts,tsx}!"],
  rules: {
    files: "warn",
    dependencies: "warn",
    exports: "warn",
    types: "warn",
    nsExports: "warn",
    nsTypes: "error"
  }
} satisfies KnipConfig
