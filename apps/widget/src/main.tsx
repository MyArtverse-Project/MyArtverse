import "@myfursona/biro-ui/styles/fonts.scss"
import "@myfursona/biro-ui/styles/globals.scss"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
