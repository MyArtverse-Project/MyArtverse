import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(async () => ({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"]
    },
    envPrefix: [
      "VITE_",
      "TAURI_PLATFORM",
      "TAURI_ARCH",
      "TAURI_FAMILY",
      "TAURI_PLATFORM_VERSION",
      "TAURI_PLATFORM_TYPE",
      "TAURI_DEBUG"
    ],
    fs: {
      allow: ["../../node_modules/@fontsource", "../.."]
    },
    build: {
      // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG
    }
  }
}))
