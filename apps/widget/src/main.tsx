import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@myfursona/biro-ui/styles/globals.scss"
import "@myfursona/biro-ui/styles/fonts.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
