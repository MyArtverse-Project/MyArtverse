import "@fontsource/inter/700.css"
import "@mav/shared/styles.css"
import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/inter"
import App from "./App"
import { TitleBar } from "./components"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TitleBar />
    <App />
  </React.StrictMode>,
)
