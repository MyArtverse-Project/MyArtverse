import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  optimizeDeps: {
    include: ["@myfursona/biro-ui/**"]
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"]
    },
    fs: {
      allow: ["..", "../../node_modules/@fontsource"]
    }
  }
}))
