import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@fontsource/inter"
import "@fontsource/inter/700.css"
import "@fontsource/open-sans"
import "@fontsource/open-sans/700.css"
import "@myfursona/biro-ui/styles/globals.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
